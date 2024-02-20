-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "wpm" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
