export const modifyDate = (dateFromApi) => {
    let yearFromApiDate = parseInt(dateFromApi.slice(0,4));
    let monthFromApiDate = parseInt(dateFromApi.slice(5,7));
    let dayFromApiDate = parseInt(dateFromApi.slice(8,10));
    let hourFromApiDate = parseInt(dateFromApi.slice(11,13)) + 1;
    let minutesFromApiDate = parseInt(dateFromApi.slice(14,16));
    
    const timeNow = new Date();
    let actualYear = timeNow.getFullYear();
    let actualMonth = timeNow.getMonth() + 1;
    let actualDay = timeNow.getDate();
    let actualHour = timeNow.getHours();
    let actualMinutes = timeNow.getMinutes();

    if(actualYear === yearFromApiDate && actualMonth === monthFromApiDate && actualDay === dayFromApiDate){
        if(actualHour === hourFromApiDate){
            let howManyMinutesAgoPostedWasAdded = Math.abs(actualMinutes - minutesFromApiDate);
            return (howManyMinutesAgoPostedWasAdded === 0 ? "przed chwilą":`${howManyMinutesAgoPostedWasAdded} min temu`);
        }else{
            let howManyHoursAgoPostWasAdded = actualHour - hourFromApiDate;
            return `${howManyHoursAgoPostWasAdded} h temu`;
        }
    }else if(actualYear === yearFromApiDate && actualMonth === monthFromApiDate){
        let howManyDaysAgoPostWasAdded = actualDay - dayFromApiDate;
        return `${howManyDaysAgoPostWasAdded} dni temu`
    }else{
        return `${dayFromApiDate}-${monthFromApiDate}-${dayFromApiDate}`;
    }
}

export const createDateObjectWhichWillBeInNewCommentObject = () => {
    const timeNow = new Date();
    let actualYear = timeNow.getFullYear();
    let actualMonth = timeNow.getMonth() + 1;
    let actualDay = timeNow.getDate();
    let actualHour = timeNow.getHours();
    let actualMinutes = timeNow.getMinutes();

    return `${actualYear}-${actualMonth}-${actualDay}T${actualHour}:${actualMinutes}`
}