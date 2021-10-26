-- CreateTable
CREATE TABLE "permissions_roles" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "permissions_roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
