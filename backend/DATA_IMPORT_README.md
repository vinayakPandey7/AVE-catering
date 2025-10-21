# Product Data Importer

This tool helps you import your real product data from Excel files and product image folders into your MongoDB database.

## Setup Instructions

### Step 1: Prepare Your Data Files

Copy your data files to the backend/data directory:

```bash
# Navigate to your backend folder
cd /Users/vinayakpandey/Desktop/practice-fe/AVE-catering/backend

# Copy your Excel file
cp "/Users/vinayakpandey/Desktop/avecatering/JUNE PRICE LIST 2025.xlsx" ./data/JUNE_PRICE_LIST_2025.xlsx

# Copy your product folders
cp -r "/Users/vinayakpandey/Desktop/avecatering/PRODUCT 2" ./data/PRODUCT_2
cp -r "/Users/vinayakpandey/Desktop/avecatering/PRODUCT 3" ./data/PRODUCT_3
cp -r "/Users/vinayakpandey/Desktop/avecatering/PRODUCT 4" ./data/PRODUCT_4
```

### Step 2: Run the Importer

```bash
# Make sure you're in the backend directory
cd /Users/vinayakpandey/Desktop/practice-fe/AVE-catering/backend

# Run the import script
pnpm run import:products
```

## What the Importer Does

1. **Reads Excel Data**: Parses your Excel file and extracts product information
2. **Uploads Images**: Finds images in your product folders and uploads them to Cloudinary
3. **Creates Products**: Converts Excel data into MongoDB documents matching your Product schema
4. **Avoids Duplicates**: Skips products that already exist (based on SKU)

## Excel Column Mapping

The importer automatically detects these column names (case-insensitive):

- **Product Name**: `name`, `product_name`, `productname`, `item_name`, `itemname`
- **SKU/Code**: `sku`, `code`, `item_code`, `product_code`, `barcode`
- **Category**: `category`, `type`, `product_type`
- **Brand**: `brand`, `manufacturer`, `supplier`
- **Price**: `price`, `unit_price`, `retail_price`, `selling_price`
- **Case Price**: `case_price`, `wholesale_price`, `bulk_price`, `price_per_case`
- **Pack Size**: `pack_size`, `size`, `packaging`, `unit_size`
- **Unit**: `unit`, `uom`, `unit_of_measure`
- **Description**: `description`, `details`, `product_description`
- **Stock**: `stock`, `quantity`, `inventory`, `stock_quantity`

## File Structure Expected

```
backend/data/
├── JUNE_PRICE_LIST_2025.xlsx
├── PRODUCT_2/
│   ├── image1.jpg
│   ├── image2.png
│   └── ...
├── PRODUCT_3/
│   ├── image1.jpg
│   └── ...
└── PRODUCT_4/
    ├── image1.jpg
    └── ...
```

## Troubleshooting

### If the Excel file has different column names:

Edit the `fieldMappings` object in `dataImporter.ts` to match your Excel columns.

### If images aren't uploading:

- Check that Cloudinary credentials are correct in `.env`
- Ensure image files are in supported formats (jpg, jpeg, png, gif, webp, avif)
- Check file permissions

### If products aren't importing:

- Verify MongoDB connection
- Check that required fields (name, sku) have values
- Look for duplicate SKUs

## Manual Steps Required

Run these commands to copy your files:

```bash
# Navigate to backend
cd /Users/vinayakpandey/Desktop/practice-fe/AVE-catering/backend

# Copy Excel file (adjust the path if needed)
cp "/Users/vinayakpandey/Desktop/avecatering/JUNE PRICE LIST 2025.xlsx" ./data/JUNE_PRICE_LIST_2025.xlsx

# Copy product folders
cp -r "/Users/vinayakpandey/Desktop/avecatering/PRODUCT 2" ./data/PRODUCT_2
cp -r "/Users/vinayakpandey/Desktop/avecatering/PRODUCT 3" ./data/PRODUCT_3
cp -r "/Users/vinayakpandey/Desktop/avecatering/PRODUCT 4" ./data/PRODUCT_4

# Run the import
pnpm run import:products
```

The importer will show progress and report any issues during the import process.
