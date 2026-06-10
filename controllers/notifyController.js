let dbDump = [
    {
        id: "notif_001",
        studentId: "1042",
        type: "Placement",
        title: "CSX Corporation Hiring",
        message: "CSX Corporation has opened applications for Software Engineer roles.",
        isRead: false,
        createdAt: new Date("2026-06-10T11:45:00.000Z")
    },
    {
        id: "notif_002",
        studentId: "1042",
        type: "Result",
        title: "Mid-Sem Exam Results",
        message: "Your Mid-Sem results for Advanced DBMS are out.",
        isRead: false,
        createdAt: new Date("2026-06-10T10:30:00.000Z")
    },
    {
        id: "notif_003",
        studentId: "9999",
        type: "Event",
        title: "Farewell Party",
        message: "Join the seniors farewell party tomorrow at 4 PM.",
        isRead: false,
        createdAt: new Date("2026-06-09T17:00:00.000Z")
    }
];


exports.fetchMyNotifications = (req, res) => {
    try {
        const currentStudent = req.studentId;
        const filteredList = dbDump.filter(item => item.studentId === currentStudent);

        return res.status(200).json({
            success: true,
            totalItems: filteredList.length,
            notifications: filteredList
        });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Server side error while fetching logs" });
    }
};


exports.markAsRead = (req, res) => {
    try {
        const targetId = req.params.id;
        const currentStudent = req.studentId;

        const record = dbDump.find(item => item.id === targetId && item.studentId === currentStudent);

        if (!record) {
            return res.status(404).json({
                success: false,
                msg: "Sorry, notification not found or unauthorized access"
            });
        }

        record.isRead = true;

        return res.status(200).json({
            success: true,
            msg: "Status updated to read successfully",
            updatedRecord: { id: record.id, isRead: record.isRead }
        });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Failed to update notification state" });
    }
};


exports.clearAllUnread = (req, res) => {
    try {
        const currentStudent = req.studentId;
        let changeCount = 0;

        dbDump.forEach(item => {
            if (item.studentId === currentStudent && !item.isRead) {
                item.isRead = true;
                changeCount++;
            }
        });

        return res.status(200).json({
            success: true,
            updatedCount: changeCount
        });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Bulk update failed" });
    }
};


exports.createNewNotification = (req, res) => {
    try {
        const { type, title, message } = req.body;

        if (!type || !title || !message) {
            return res.status(400).json({ success: false, msg: "Please fill all fields: type, title, message" });
        }

        const freshRecord = {
            id: "notif_" + Date.now(),
            studentId: req.studentId,
            type,
            title,
            message,
            isRead: false,
            createdAt: new Date()
        };

        dbDump.push(freshRecord);

        return res.status(201).json({
            success: true,
            msg: "Successfully injected fresh notification entry",
            data: freshRecord
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};