import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true 
    },
    description: { 
      type: String 
    },
    image: { 
      type: String 
    },
    imagePublicId: { 
      type: String 
    },
    parentCategory: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category", 
      default: null 
    },
    subcategories: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category" 
    }],
    isActive: { 
      type: Boolean, 
      default: true 
    },
    displayOrder: { 
      type: Number, 
      default: 0 
    },
    productCount: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true 
  }
);

// Index for better query performance
categorySchema.index({ slug: 1 });
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ isActive: 1, displayOrder: 1 });

// Pre-save middleware to generate slug
categorySchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();
  }
  next();
});

// Ensure slug is always generated
categorySchema.pre('validate', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
