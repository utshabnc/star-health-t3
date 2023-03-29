const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen w-full bg-bgPrimary text-white">
      <div className="container mx-auto flex max-w-4xl flex-col gap-5 py-20">
        <h1 className="text-3xl">Privacy Policy for StarHealth.io</h1>
        <p>
          At StarHealth.io, we are committed to protecting the privacy of our
          users. This Privacy Policy explains how we collect, use, and share
          information about you when you use our healthcare data app.
        </p>

        <h2 className="mt-5 text-xl">Information We Collect</h2>
        <p>
          When you use StarHealth.io, we may collect the following types of
          information:
        </p>
        <ul className="list-decimal pl-10">
          <li>
            Personal Information: We collect information that can be used to
            identify you, such as your name, email address, and phone number.
          </li>
          <li>
            Health Information: We may collect health-related information such
            as your medical history, lab results, and other health-related data.
          </li>
          <li>
            Usage Information: We collect information about how you use our app,
            including the pages you visit, the features you use, and the actions
            you take.
          </li>
          <li>
            Device Information: We may collect information about the device you
            use to access our app, such as the type of device, operating system,
            and browser.
          </li>
          <li>
            Location Information: We may collect information about your location
            when you use our app.
          </li>
        </ul>

        <h2 className="mt-5 text-xl">How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul className="list-decimal pl-10">
          <li>To provide you with our healthcare data app and its features.</li>
          <li>To improve and optimize our app and its features.</li>
          <li>
            To communicate with you about our app, including updates, new
            features, and promotions.
          </li>
          <li>To respond to your inquiries and provide customer support.</li>
          <li>
            To comply with legal requirements and to protect our rights and the
            rights of others.
          </li>
        </ul>

        <h2 className="mt-5 text-xl">How We Share Your Information</h2>
        <p>We may share your information with the following third parties:</p>
        <ul className="list-decimal pl-10">
          <li>
            Service Providers: We may share your information with third-party
            service providers that help us provide our app and its features.
          </li>
          <li>
            Legal Requirements: We may share your information when required by
            law or in response to a subpoena, court order, or other legal
            request.
          </li>
          <li>
            Business Transfers: We may share your information in connection with
            a merger, acquisition, or sale of all or a portion of our assets.
          </li>
          <li>
            With Your Consent: We may share your information with third parties
            if you have given us your consent to do so.
          </li>
        </ul>

        <h2 className="mt-5 text-xl">Data Security</h2>
        <p>
          We take the security of your information seriously and have
          implemented appropriate technical and organizational measures to
          protect your information from unauthorized access, use, disclosure,
          alteration, or destruction.
        </p>

        <h2 className="mt-5 text-xl">Your Choices</h2>
        <p>
          You can choose not to provide us with certain information, but this
          may limit your ability to use some of our app's features. You can also
          opt-out of receiving marketing communications from us by following the
          instructions in the communication.
        </p>

        <h2 className="mt-5 text-xl">Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If we make
          material changes to this Privacy Policy, we will notify you by email
          or by posting a notice on our app.
        </p>

        <h2 className="mt-5 text-xl">Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          app's privacy practices, please contact us
        </p>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
