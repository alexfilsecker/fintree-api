-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInstitutionCredentials" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "institutionId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserInstitutionCredentials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInstitutionCredentials" ADD CONSTRAINT "UserInstitutionCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInstitutionCredentials" ADD CONSTRAINT "UserInstitutionCredentials_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
