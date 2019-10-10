export const getStillEndAt = ( FOCUS, RECENT ) => {
    if ( RECENT ) {
        if ( !FOCUS.isYesterday && RECENT.postYesterday ) {
            return FOCUS.block + 1 + 96;
        } else {
            return FOCUS.block + 1; 
        }
    } else {
        return FOCUS.block + 1; 
    }
}

export const getPullStartAt = ( FOCUS, NEXT ) => {
    if ( NEXT ) {
        if ( FOCUS.isYesterday && !NEXT.postYesterday ) {
            return FOCUS.block - 96;
        } else {
            return FOCUS.block;
        }
    } else {
        return FOCUS.block; 
    }
}

export const getCutBottomEndAt = ( FOCUS, RECENT ) => {
    if ( RECENT ) {
        if ( FOCUS.isYesterday && !RECENT.postYesterday ) {
            return FOCUS.block - 96;
        } else if ( !FOCUS.isYesterday && RECENT.postYesterday ) {
            return FOCUS.block + 96;
        } else {
            return FOCUS.block;
        }
    }
}

export const getCutTopStartAt = ( FOCUS, RECENT ) => {
    if ( RECENT ) {
        if ( FOCUS.isYesterday && !RECENT.postYesterday ) {
            return FOCUS.block - 96; 
        } else {
            return FOCUS.block; 
        }
    }
}

export const getCutTopEndAt = ( FOCUS, RECENT ) => {
    if ( RECENT ) {
        if ( !FOCUS.isYesterday && RECENT.postYesterday ) {
            return RECENT.endAt - 96; 
        } else {
            return RECENT.endAt; 
        }
    }
}

export const getCutTopType = ( FOCUS, RECENT ) => {
    if ( RECENT ) {
        if ( !FOCUS.isYesterday && RECENT.postYesterday ) {
            return "stEnYymd_YesterToToday"
        } else {
            return "stEnYymd"
        }
    }
}