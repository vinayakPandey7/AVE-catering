import mongoose, { Schema } from 'mongoose';
const settingsSchema = new Schema({
    siteName: {
        type: String,
        required: true,
        default: 'AVE Catering',
    },
    siteDescription: {
        type: String,
        default: 'Professional catering supplies and equipment',
    },
    contactEmail: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: {
            type: String,
            default: 'United States',
        },
    },
    business: {
        name: String,
        taxId: String,
        licenseNumber: String,
    },
    shipping: {
        freeShippingThreshold: {
            type: Number,
            default: 100,
        },
        standardShippingRate: {
            type: Number,
            default: 10,
        },
        expressShippingRate: {
            type: Number,
            default: 25,
        },
        processingTime: {
            type: Number,
            default: 2,
        },
    },
    payment: {
        stripePublicKey: String,
        stripeSecretKey: String,
        paypalClientId: String,
        paypalSecret: String,
    },
    notifications: {
        emailNotifications: {
            type: Boolean,
            default: true,
        },
        smsNotifications: {
            type: Boolean,
            default: false,
        },
        orderNotifications: {
            type: Boolean,
            default: true,
        },
        lowStockNotifications: {
            type: Boolean,
            default: true,
        },
    },
    inventory: {
        lowStockThreshold: {
            type: Number,
            default: 10,
        },
        autoReorder: {
            type: Boolean,
            default: false,
        },
        reorderQuantity: {
            type: Number,
            default: 50,
        },
    },
    features: {
        enableOffers: {
            type: Boolean,
            default: true,
        },
        enableReviews: {
            type: Boolean,
            default: true,
        },
        enableWishlist: {
            type: Boolean,
            default: true,
        },
        enableNotifications: {
            type: Boolean,
            default: true,
        },
    },
    social: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String,
    },
    seo: {
        metaTitle: String,
        metaDescription: String,
        metaKeywords: [String],
        googleAnalyticsId: String,
    },
    maintenance: {
        isMaintenanceMode: {
            type: Boolean,
            default: false,
        },
        maintenanceMessage: {
            type: String,
            default: 'We are currently performing maintenance. Please check back later.',
        },
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
// Ensure only one settings document exists
settingsSchema.index({}, { unique: true });
const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
