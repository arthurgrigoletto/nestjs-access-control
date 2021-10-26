-- CreateTable
CREATE TABLE "users_permissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "users_permissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_permissions" ADD CONSTRAINT "users_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_permissions" ADD CONSTRAINT "users_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
