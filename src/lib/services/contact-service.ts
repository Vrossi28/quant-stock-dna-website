import { ApiRoutes } from "@/constants/api-routes";
import apiClient from "./api-client";
import { HttpStatusCode } from "axios";

export const sendContactForm = async (
  data: ContactFormData
): Promise<boolean> => {
  try {
    const response = await apiClient.post(ApiRoutes.RequestContact, data);
    return response.status === 204;
  } catch (error) {
    throw new Error("Error while sending the contact formulary");
  }
};

export const registerSubscriber = async (
  data: ContactFormData
): Promise<boolean> => {
  try {
    const response = await apiClient.post(
      ApiRoutes.SubscribeToNewsletter,
      data
    );
    return response.status === 204;
  } catch (error) {
    throw new Error(
      "Error while sending the request to subscribe to newsletter"
    );
  }
};

export const updateSubscriberPreferences = async (
  preferences: Preferences
): Promise<Preferences> => {
  const response = await apiClient.put(
    ApiRoutes.SubscribeToNewsletter,
    preferences
  );
  if (response.status !== HttpStatusCode.Ok) throw Error("Invalid response");

  return response.data;
};

export const getPreferences = async (id: string): Promise<Preferences> => {
  const response = await apiClient.get(
    `${ApiRoutes.SubscribeToNewsletter}/${id}`
  );
  if (response.status !== HttpStatusCode.Ok) throw Error("Invalid response");

  return response.data;
};
