const fileName1 = ["AAPL", "AMZN", "GOOG", "IBM", "MSFT"];
const fileName2 = ["APPLE", "AMAZN", "GOOGL", "IBM", "MSOFT"];
const resultArr = [];
await Promise.all(
        [   d3.csv(`./data/${fileName1[0]}10yrs.csv`), 
            d3.csv(`./data/${fileName1[1]}10yrs.csv`), 
            d3.csv(`./data/${fileName1[2]}10yrs.csv`), 
            d3.csv(`./data/${fileName1[3]}10yrs.csv`), 
            d3.csv(`./data/${fileName1[4]}10yrs.csv`)  ])  
        .then (files => files.forEach((csvFile, i) => {
            const dataArr = csvFile.map(item => {
                return {name: fileName2[i], date: item['Date'], value: +item['Close']}
            });
            resultArr.push(dataArr);
        })
);

const data = d3.merge(resultArr);

export default data;