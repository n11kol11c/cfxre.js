export const CfxAuth = {
    canAccess(marker) {
        if (!marker.restricted) return true;

        const PlayerData = exports['qbx_core'].GetPlayerData();
        if (!PlayerData) return false;

        if (marker.job && PlayerData.job.name !== marker.job) return false;
        if (marker.rank > 0 && PlayerData.job.grade.level < marker.rank) return false;
        if (marker.citizenid && PlayerData.citizenid !== marker.citizenid) return false;

        return true;
    }
};
