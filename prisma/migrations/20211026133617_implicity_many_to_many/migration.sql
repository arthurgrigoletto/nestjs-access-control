/*
  Warnings:

  - You are about to drop the `permissions_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissions_roles" DROP CONSTRAINT "permissions_roles_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "permissions_roles" DROP CONSTRAINT "permissions_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "users_permissions" DROP CONSTRAINT "users_permissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "users_permissions" DROP CONSTRAINT "users_permissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_userId_fkey";

-- DropTable
DROP TABLE "permissions_roles";

-- DropTable
DROP TABLE "users_permissions";

-- DropTable
DROP TABLE "users_roles";

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PermissionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToUser_AB_unique" ON "_PermissionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToUser_B_index" ON "_PermissionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD FOREIGN KEY ("A") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD FOREIGN KEY ("A") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
