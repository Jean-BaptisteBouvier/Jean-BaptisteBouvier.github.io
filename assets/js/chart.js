/*
Javascript code to build the citations histogram
using data scraped from Google Scholar using the Python script
`Google_scholar_metrics.py`

*/

/* Data scraped from Google Scholar with Python script*/
var total_citations = 61;
var h_index = 4;
var i10_index = 2;
var last_update = "May 23 2023";
var years_cited = [2018, 2019, 2020, 2021, 2022, 2023];
var citations_per_year = [2, 3, 4, 9, 23, 20];
var citations_per_paper = [15, 12, 8, 6, 4, 4, 4, 3, 1, 1, 1, 1, 1, 0, 0];
var titles = ['Preliminary design of low-energy, low-thrust transfers to halo orbits using feedback control', 'Quantitative resilience of linear driftless systems', 'Resilient reachability for linear systems', 'Designing resilient linear systems', 'Quantitative Resilience of Linear Systems', 'Designing resilient linear driftless systems', 'Spacecraft trajectory tracking and parameter estimation around a splitting contact binary asteroid', 'The Maximax Minimax Quotient Theorem', 'Resilience of linear systems to partial loss of control authority', 'Distributed Transient Safety Verification via Robust Control Invariant Sets: A Microgrid Application', 'Resilience of orbital inspections to partial loss of control authority of the chaser satellite', 'Quantitative Resilience of Generalized Integrators', 'Orbit control for a spacecraft around a splitting contact binary asteroid', 'Resilient Trajectory Tracking to Partial Loss of Control Authority over Actuators with Actuation Delay', 'Assured System-Level Resilience for Guaranteed Disaster Response'];
var links_citations = ['https://scholar.google.com/scholar?oi=bibs&hl=en&cites=15867869489605474014', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=1674438979349476753', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=12994462789597643066', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=16589064241543812386', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=13481627010641748787', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=585800018701299105', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=15189642400668903976', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=12204788610249439923', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=283779437568804643', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=6744962304205001077', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=4814518497430150789', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=13678218939683511340', 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=14647554166549373763', '', ''];
	
  
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
      data: citations_per_year,
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



/* Adding the number of citations to each paper*/
var nb_papers = citations_per_paper.length;
for (let i = 0; i < nb_papers; i++){
	document.getElementById(titles[i]).innerHTML = citations_per_paper[i];
	document.getElementById(titles[i]).href = links_citations[i];
}