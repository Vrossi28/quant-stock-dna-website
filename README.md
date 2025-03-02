# QuantStockDNA Website UI

This repository contains the implementation of the [QuantStockDNA](https://quantstockdna.com/home) main website.

![QuantStockDNA website preview](<src/assets/Website preview.png>)

## Technologies Used

The project is built using the following technologies:

- **React**
- **TypeScript**
- **Vite**

## Getting Started

### 1. Setup Environment Variables

Before starting the project, ensure that the required environment variables are configured. These are used for backend integration and analytics.

### 2. Install Dependencies

Navigate to the project folder and install the necessary dependencies:

```sh
cd src
npm install
```

### 3. Run the Development Server

Start the development server with:

```sh
npm run dev
```

This will launch the project and make it accessible locally.

## Backend Integration

The frontend communicates with a backend service to send emails when users request contact. To configure backend access, define the following environment variables:

- `VITE_API_URL` - Backend API base URL.
- `VITE_LOGIN` - API authentication username.
- `VITE_PASSWORD` - API authentication password.

## Google Analytics Integration

Google Analytics is used to track user interactions and events on the website. To configure Firebase events, set the following environment variables:

- `VITE_GOOGLE_API_KEY`
- `VITE_GOOGLE_AUTH_DOMAIN`
- `VITE_GOOGLE_PROJECT_ID`
- `VITE_GOOGLE_STORAGE_BUCKET`
- `VITE_GOOGLE_MESSAGING_SENDER_ID`
- `VITE_GOOGLE_APP_ID`
- `VITE_GOOGLE_MEASUREMENT_ID`

If you do not wish to configure these in the development environment, you can assign them random values.

## Internationalization (i18n)

The website supports multiple languages (English and Portuguese) using internationalization (i18n).

### Adding New Translations

All text content should be added to the localization files in the [`src/localization`](src/localization) directory.

1. Open the **global.json** file inside the `en` and `pt` folders.
2. Add the new translation key and value:

```json
{
  "example": "Example"
}
```

3. Use the translation key in your components:

```tsx
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

return <p>{t("example")}</p>;
```

This ensures that the content is properly translated based on the selected language.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request.

---

This README provides a clear and structured overview of the project setup and usage. Let me know if you need further refinements!
