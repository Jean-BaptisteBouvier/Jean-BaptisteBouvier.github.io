/*
Javascript code to build the citations histogram
using data scraped from Google Scholar using the Python script
`Google_scholar_metrics.py`

*/

/* Data scraped from Google Scholar with Python script*/
var total_citations = 60;
var h_index = 4;
var i10_index = 2;
var last_update = "May 8th 2023";
var years_cited = [2018, 2019, 2020, 2021, 2022, 2023];
var citations_by_year = [2, 3, 4, 9, 24, 12];
	
	
  
/* Getting the table to write citations and indices */
var table = document.getElementById("citations_table");
  
/* Updating number of citations*/
var citation_row = table.getElementsByTagName("tr")[0];
citation_row.getElementsByTagName("td")[1].innerHTML = total_citations;
  
/* Updating h-index*/
var h_index_row = table.getElementsByTagName("tr")[1];
h_index_row.getElementsByTagName("td")[1].innerHTML = h_index;
  
/* Updating i10-index*/
var i10_index_row = table.getElementsByTagName("tr")[2];
i10_index_row.getElementsByTagName("td")[1].innerHTML = i10_index;

/* Writing the date where data has last been updated*/
document.getElementById("last_update").innerHTML = "Last updated: " + last_update;
  
  
  
  
/* Getting the canvas for the histogram of citations*/
const ctx = document.getElementById('histogram');
	
/* Creating the histogram of citations*/
const hist = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: years_cited,
    datasets: [{
      data: citations_by_year,
      borderWidth: 0,
	  backgroundColor: 'rgba(50, 50, 50, 0.8)',
	  barThickness: 20,
      }]
    },
    options: {
	  responsive: false,
	  maintainAspectRatio: false,
	  events: [], /* removing the hovering effects*/
	  plugins: {legend: {display: false}},
      scales: {y: {beginAtZero: true}}
    }
});
  
/* Adjusting column width of the histogram with amount of data*/
const col_width = 40
document.getElementById('histogram').style.width = (hist.data.labels.length + 1)*col_width + "px"

