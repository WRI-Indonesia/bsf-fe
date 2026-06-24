import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

import {
  foodPreferenceOptions,
  type EventRegistrationFieldErrors,
  type EventRegistrationPayloadValues,
  type EventRegistrationResponse,
  type EventRegistrationStatus,
  type FoodPreference,
  validateEventRegistration,
} from "@/lib/event-registration";

type RegistrationDoc = {
  id: number | string;
  cvFile?: number | { id?: number | null } | null;
  passportInfoPageFile?: number | { id?: number | null } | null;
  profilePhotoFile?: number | { id?: number | null } | null;
  registrationKey: string;
  signatureFile?: number | { id?: number | null } | null;
};

const jsonError = (
  body: {
    errors?: EventRegistrationFieldErrors;
    message: string;
  },
  status: number,
) =>
  NextResponse.json<EventRegistrationResponse>(
    {
      ...body,
      ok: false,
    },
    { status },
  );

const getUploadId = (
  value: number | { id?: number | null } | null | undefined,
): number | null => {
  if (value == null) {
    return null;
  }

  if (typeof value === "object") {
    return value.id ?? null;
  }

  return value;
};

async function createMediaUpload(file: File) {
  const payload = await getPayload({ config });
  const data = Buffer.from(await file.arrayBuffer());

  return payload.create({
    collection: "media",
    data: {
      alt: file.name,
    },
    file: {
      data,
      mimetype: file.type || "application/octet-stream",
      name: file.name,
      size: file.size,
    },
  });
}

function readStringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function readFileField(formData: FormData, key: string) {
  const value = formData.get(key);

  if (value instanceof File && value.size > 0) {
    return value;
  }

  return null;
}

function readFoodPreferenceField(formData: FormData) {
  const value = formData.get("foodPreference");

  if (
    typeof value === "string" &&
    foodPreferenceOptions.includes(
      value as (typeof foodPreferenceOptions)[number],
    )
  ) {
    return value as Exclude<FoodPreference, null>;
  }

  return undefined as Exclude<FoodPreference, null> | undefined;
}

function readBooleanField(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "true" || value === "on" || value === "1";
}

export async function POST(request: Request) {
  const payload = await getPayload({ config });

  try {
    const formData = await request.formData();
    const registrationKey = readStringField(formData, "registrationKey").trim();
    const requestedStatus = readStringField(formData, "status");
    const status: EventRegistrationStatus =
      requestedStatus === "submitted" ? "submitted" : "draft";

    if (!registrationKey) {
      return jsonError(
        {
          message: "Registration key is required.",
        },
        400,
      );
    }

    const registrationResult = await payload.find({
      collection: "event-registrations",
      depth: 0,
      limit: 1,
      pagination: false,
      where: {
        registrationKey: {
          equals: registrationKey,
        },
      },
    });

    const registration = registrationResult.docs[0] as RegistrationDoc | undefined;

    if (!registration) {
      return jsonError(
        {
          message:
            "We couldn't find that registration. Please check the invitation link.",
        },
        404,
      );
    }

    const cvFile = readFileField(formData, "cvFile");
    const profilePhotoFile = readFileField(formData, "profilePhotoFile");
    const passportInfoPageFile = readFileField(formData, "passportInfoPageFile");
    const signatureFile = readFileField(formData, "signatureFile");

    const payloadValues: Partial<EventRegistrationPayloadValues> = {
      bioSketch: readStringField(formData, "bioSketch"),
      cvFile: cvFile ?? getUploadId(registration.cvFile),
      department: readStringField(formData, "department"),
      email: readStringField(formData, "email"),
      fieldOfExpertise: readStringField(formData, "fieldOfExpertise"),
      firstName: readStringField(formData, "firstName"),
      flightNotes: readStringField(formData, "flightNotes"),
      foodPreference: readFoodPreferenceField(formData),
      fullAddress: readStringField(formData, "fullAddress"),
      isInternationalParticipant: readBooleanField(
        formData,
        "isInternationalParticipant",
      ),
      lastName: readStringField(formData, "lastName"),
      middleName: readStringField(formData, "middleName"),
      mobile: readStringField(formData, "mobile"),
      nationality: readStringField(formData, "nationality"),
      organization: readStringField(formData, "organization"),
      passportInfoPageFile:
        passportInfoPageFile ?? getUploadId(registration.passportInfoPageFile),
      passportNumber: readStringField(formData, "passportNumber"),
      postalCode: readStringField(formData, "postalCode"),
      positionTitle: readStringField(formData, "positionTitle"),
      preferredArrivalDate: readStringField(formData, "preferredArrivalDate"),
      preferredDepartureDate: readStringField(formData, "preferredDepartureDate"),
      profilePhotoFile:
        profilePhotoFile ?? getUploadId(registration.profilePhotoFile),
      prefix: readStringField(formData, "prefix"),
      signatureFile: signatureFile ?? getUploadId(registration.signatureFile),
      whatsappOrViber: readStringField(formData, "whatsappOrViber"),
    };

    const { errors, normalized } = validateEventRegistration(payloadValues, status);

    if (Object.keys(errors).length > 0) {
      return jsonError(
        {
          errors,
          message: "Please correct the highlighted fields.",
        },
        400,
      );
    }

    const [cvUpload, profileUpload, passportUpload, signatureUpload] =
      await Promise.all([
        cvFile ? createMediaUpload(cvFile) : null,
        profilePhotoFile ? createMediaUpload(profilePhotoFile) : null,
        passportInfoPageFile ? createMediaUpload(passportInfoPageFile) : null,
        signatureFile ? createMediaUpload(signatureFile) : null,
      ]);

    await payload.update({
      collection: "event-registrations",
      data: {
        ...normalized,
        cvFile: cvUpload?.id ?? getUploadId(registration.cvFile),
        passportInfoPageFile:
          passportUpload?.id ?? getUploadId(registration.passportInfoPageFile),
        profilePhotoFile:
          profileUpload?.id ?? getUploadId(registration.profilePhotoFile),
        signatureFile: signatureUpload?.id ?? getUploadId(registration.signatureFile),
        registrationKey: registration.registrationKey,
        status,
      },
      id: registration.id,
    });

    return NextResponse.json<EventRegistrationResponse>({
      message:
        status === "submitted"
          ? "Registration submitted successfully."
          : "Draft saved successfully.",
      ok: true,
      status,
    });
  } catch (error) {
    console.error("Event registration save failed:", error);

    return jsonError(
      {
        message: "We couldn't save the registration. Please try again.",
      },
      500,
    );
  }
}
