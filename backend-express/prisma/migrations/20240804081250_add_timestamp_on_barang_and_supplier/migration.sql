/*
  Warnings:

  - Added the required column `updated_at` to the `supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[supplier] ADD [created_at] DATETIME2 NOT NULL CONSTRAINT [supplier_created_at_df] DEFAULT CURRENT_TIMESTAMP,
[updated_at] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[transaction] ADD [created_at] DATETIME2 NOT NULL CONSTRAINT [transaction_created_at_df] DEFAULT CURRENT_TIMESTAMP,
[updated_at] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
