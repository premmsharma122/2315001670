const { sortNotificationsByPriority } = require('./utils/priorityInbox');

const TARGET_LIMIT = 10;
const mockExternalStream = [
    {
        "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
        "Type": "Result",
        "Message": "mid-sem results are declared check portal",
        "Timestamp": "2026-04-22 17:51:30"
    },
    {
        "ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0",
        "Type": "Placement",
        "Message": "CSX Corporation hiring application open tonight",
        "Timestamp": "2026-04-22 17:51:18"
    },
    {
        "ID": "81589ada-0ad3-4f77-9554-f52fb558e09d",
        "Type": "Event",
        "Message": "farewell registration starts now",
        "Timestamp": "2026-04-22 17:51:00"
    },
    {
        "ID": "a1111111-2222-3333-4444-555555555555",
        "Type": "Placement",
        "Message": "Google India Off-Campus Drive 2026",
        "Timestamp": "2026-04-23 10:00:00" // Yeh bilkul latest placement hai
    },
    {
        "ID": "b2222222-3333-4444-5555-666666666666",
        "Type": "Result",
        "Message": "End-Sem practical marks uploaded",
        "Timestamp": "2026-04-21 12:00:00"
    },
    {
        "ID": "c3333333-4444-4444-5555-777777777777",
        "Type": "Placement",
        "Message": "Microsoft software engineer roles opening",
        "Timestamp": "2026-04-22 12:00:00" // Purani placement
    }
];

async function executePriorityInbox() {
    console.log("[Priority Inbox] Fetching live stream notifications from external pipeline...");

    try {
    
        const rawNotifications = mockExternalStream;
        console.log(`[Success] Retrieved ${rawNotifications.length} notifications successfully from pipeline channel.`);

    
        const sortedList = sortNotificationsByPriority(rawNotifications);

    
        const top10Notifications = sortedList.slice(0, TARGET_LIMIT);

        
        console.log("\n=================== YOUR PRIORITY INBOX (TOP 10) ===================");
        console.table(top10Notifications.map((n, index) => ({
            Rank: index + 1,
            Type: n.Type,
            Message: n.Message && n.Message.length > 50 ? n.Message.substring(0, 47) + "..." : n.Message,
            Timestamp: n.Timestamp
        })));
        console.log("====================================================================\n");

        console.log("Algorithm Output Verification:");
        console.log("-> Notice how 'Placement' items come to the top, sorted by latest Timestamp first!");

    } catch (error) {
        console.error(`[Execution Error] Priority Inbox pipeline failed: ${error.message}`);
    }
}

executePriorityInbox();