const { arrangeByPriorityAndDate } = require('./utils/priorityEngine');

const MAX_ROWS = 10;

const sampleFeedStream = [
    { "ID": "1", "Type": "Result", "Message": "mid-sem results are declared check portal", "Timestamp": "2026-04-22 17:51:30" },
    { "ID": "2", "Type": "Placement", "Message": "CSX Corporation hiring application open tonight", "Timestamp": "2026-04-22 17:51:18" },
    { "ID": "3", "Type": "Event", "Message": "farewell registration starts now", "Timestamp": "2026-04-22 17:51:00" },
    { "ID": "4", "Type": "Placement", "Message": "Google India Off-Campus Drive 2026", "Timestamp": "2026-04-23 10:00:00" },
    { "ID": "5", "Type": "Result", "Message": "End-Sem practical marks uploaded", "Timestamp": "2026-04-21 12:00:00" },
    { "ID": "6", "Type": "Placement", "Message": "Microsoft software engineer roles opening", "Timestamp": "2026-04-22 12:00:00" }
];

function processInboxMetrics() {
    console.log("[Pipeline Debug] Parsing feed stream nodes...");

    try {
        // Execute rank sorting engine
        const operationalFeed = arrangeByPriorityAndDate(sampleFeedStream);
        const targetedInboxSlice = operationalFeed.slice(0, MAX_ROWS);

        console.log("\n>>> OUTPUT EVALUATION RESULT (TOP 10 PRIORITY FEED) <<<");
        console.table(targetedInboxSlice.map((item, idx) => ({
            PriorityRank: idx + 1,
            Category: item.Type,
            BriefMessage: item.Message,
            CapturedTime: item.Timestamp
        })));
        console.log("=========================================================\n");

    } catch (e) {
        console.error(`Pipeline runtime process crash: ${e.message}`);
    }
}

processInboxMetrics();