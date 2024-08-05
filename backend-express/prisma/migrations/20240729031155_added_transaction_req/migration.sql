BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[barang] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(100) NOT NULL,
    [quantity] INT NOT NULL,
    [type] VARCHAR(50) NOT NULL,
    [supplier_code] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [barang_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [barang_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[supplier] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(100) NOT NULL,
    [location] VARCHAR(255) NOT NULL,
    CONSTRAINT [supplier_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[transaction] (
    [id] INT NOT NULL IDENTITY(1,1),
    [id_barang] INT,
    [id_supplier] INT,
    [transaction_name] VARCHAR(255) NOT NULL,
    [transaction_value] INT NOT NULL,
    [returned_value] INT NOT NULL,
    [transaction_date] DATETIME2 NOT NULL CONSTRAINT [transaction_transaction_date_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [transaction_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[transaction] ADD CONSTRAINT [transaction_id_barang_fkey] FOREIGN KEY ([id_barang]) REFERENCES [dbo].[supplier]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[transaction] ADD CONSTRAINT [transaction_id_supplier_fkey] FOREIGN KEY ([id_supplier]) REFERENCES [dbo].[barang]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
