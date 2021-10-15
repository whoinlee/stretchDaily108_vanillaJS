// let series = [];
// const data = d3.merge(await Promise.all(
//     [   d3.csv("./data/AAPL10yrs.csv"), 
//         d3.csv("./data/AMZN10yrs.csv"), 
//         d3.csv("./data/GOOG10yrs.csv"), 
//         d3.csv("./data/IBM10yrs.csv"), 
//         d3.csv("./data/MSFT10yrs.csv")  ]
//         .map(async file => d3.csvParse(await file.text(), d => {
//             const date = parseDate(d["Date"]);
//             return {name: file.name.slice(0, -4), date, value: +d["Close"]};
//     })))
// );
const row = d => {
    d.value = +d['Close'];
    d.date = d['Date'];
    return d;
};
const fileName = ["AAPL", "AMZN", "GOOG", "IBM", "MSFT"];
let resultArr = [];
await Promise.all(
        [   d3.csv(`./data/${fileName[0]}10yrs.csv`, row), 
            d3.csv(`./data/${fileName[1]}10yrs.csv`, row), 
            d3.csv(`./data/${fileName[2]}10yrs.csv`, row), 
            d3.csv(`./data/${fileName[3]}10yrs.csv`, row), 
            d3.csv(`./data/${fileName[4]}10yrs.csv`, row)  ])  
        .then (files => files.forEach((csvFile, i) => {
                const dataArr = csvFile.map(item => {
                    return {name:fileName[i], date: item.date, value: item.value}
                });
                resultArr.push(dataArr);
        })
);
const data = d3.merge(resultArr);

export default data;