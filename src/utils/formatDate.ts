const formatDate= (date:string) => {
    let month = date.split("/")[1];
    let day = date.split("/")[0];
    const year =date.split("/")[2];
  
    if (month.length < 2) { month = `0${month}`; }
    if (day.length < 2) { day = `0${day}`; }
  
    return [day, month, year].join('-');
  };

export default formatDate;