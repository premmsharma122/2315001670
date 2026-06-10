const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        index: true 
    },
    type: {
        type: String,
        required: true,
        enum: ['Event', 'Result', 'Placement'] 
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true 
});


NotificationSchema.index({ studentId: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);