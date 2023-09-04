-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "specialty" TEXT,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateCounty" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fips" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "population" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "drugType" TEXT NOT NULL,

    CONSTRAINT "StateCounty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateSummary" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "year" TEXT NOT NULL,
    "rank" INTEGER,
    "drugType" TEXT NOT NULL,

    CONSTRAINT "StateSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateItem" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,
    "drugType" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "StateItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateDoctor" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,
    "drugType" TEXT NOT NULL,

    CONSTRAINT "StateDoctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateManufacturer" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,
    "drugType" TEXT NOT NULL,

    CONSTRAINT "StateManufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT,
    "country" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManufacturerSummary" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "ManufacturerSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManufacturerState" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "ManufacturerState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManufacturerItems" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "productName" TEXT,
    "productType" TEXT,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "ManufacturerItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManufacturerDoctors" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "ManufacturerDoctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManufacturerTopPayment" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ManufacturerTopPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "manufacturerName" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" DATE NOT NULL,
    "year" TEXT NOT NULL,
    "paymentType" TEXT,
    "paymentNature" TEXT,
    "contextualInfo" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "category" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "review_doctor_index" ON "Review"("doctorId");

-- CreateIndex
CREATE INDEX "review_user_index" ON "Review"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "Review_doctorId_createdBy_key" ON "Review"("doctorId", "createdBy");

-- CreateIndex
CREATE INDEX "payment_year_index" ON "Payment"("year");

-- CreateIndex
CREATE INDEX "payment_doctor_index" ON "Payment"("doctorId");

-- CreateIndex
CREATE INDEX "payment_manufacturer_index" ON "Payment"("manufacturerId");

-- CreateIndex
CREATE INDEX "payment_product_index" ON "Payment"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "StateCounty" ADD CONSTRAINT "StateCounty_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateSummary" ADD CONSTRAINT "StateSummary_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateItem" ADD CONSTRAINT "StateItem_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateItem" ADD CONSTRAINT "StateItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateItem" ADD CONSTRAINT "StateItem_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateDoctor" ADD CONSTRAINT "StateDoctor_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateDoctor" ADD CONSTRAINT "StateDoctor_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateManufacturer" ADD CONSTRAINT "StateManufacturer_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateManufacturer" ADD CONSTRAINT "StateManufacturer_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerSummary" ADD CONSTRAINT "ManufacturerSummary_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerState" ADD CONSTRAINT "ManufacturerState_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerItems" ADD CONSTRAINT "ManufacturerItems_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerDoctors" ADD CONSTRAINT "ManufacturerDoctors_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerDoctors" ADD CONSTRAINT "ManufacturerDoctors_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerTopPayment" ADD CONSTRAINT "ManufacturerTopPayment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerTopPayment" ADD CONSTRAINT "ManufacturerTopPayment_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
