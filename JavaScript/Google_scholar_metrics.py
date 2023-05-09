# -*- coding: utf-8 -*-
"""
Created on Fri May  5 15:32:20 2023

@author: Jean-Baptiste Bouvier

Code to extract Google scholar metrics from a profile
"""

import datetime
from urllib.request import urlopen



################# User Inputs ################

# Link to the Google scholar page to read
link = "https://scholar.google.com/citations?user=Ovf-u14AAAAJ&hl=en"



#################### Code #####################

# Getting the html code of the page
html = urlopen(link).read().decode("utf-8")
    
# Searching for the number of citations per year
word = '<span class="gsc_g_al">'
citations_by_year = []
max_digits = 10 # maximum number of digits for citations
word_index = html.find(word)
while word_index > -1:
    s = html[word_index+len(word):word_index+len(word)+max_digits].split('<')
    citations_by_year.append(int(s[0]))
    word_index = html.find(word, word_index+len(word))

# Total number of citations
total_citations = sum(citations_by_year)

# Creating the list of years with citations
current_year = datetime.date.today().year
num_years_cited = len(citations_by_year)
years_cited = list(range(current_year-num_years_cited+1, current_year+1))

# Searching for the i10 index
word = 'i10-index</a></td><td class="gsc_rsb_std">'
word_index = html.find(word)
s = html[word_index+len(word):word_index+len(word)+max_digits].split('<')
i10_index = int(s[0])

# Searching for the h index
word = 'h-index</a></td><td class="gsc_rsb_std">'
word_index = html.find(word)
s = html[word_index+len(word):word_index+len(word)+max_digits].split('<')
h_index = int(s[0])

# Date of the last update of Google Scholar
last_update = datetime.date.today().strftime('%B %d %Y')

# Displaying outputs
print('Last update:', last_update)
print('Total number of citations:', total_citations)
print('i10-index:', i10_index)
print('h-index:', h_index)
for i in range(num_years_cited):
    print(citations_by_year[i], " citations in ", years_cited[i])






