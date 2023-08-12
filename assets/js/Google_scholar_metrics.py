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
# Name of the JavaScript file that pushes the Google scholar data to html
javascript_file = 'chart.js'
# Choose whether or not to display the extracted data in the console
display_data = False

################ Functions #####################


### Function to find all occurences of a given 'keyword' in the 'html' string
### and return in 'output_list' all the text found after this word and before the 'end_character'

def find_all_string(html, keyword, end_character):
    
    output_list = []
    len_word = len(keyword)
    word_index = html.find(keyword)
    
    while word_index > -1:
        index_end = html.find(end_character, word_index+len_word)
        s = html[word_index+len_word:index_end]
        output_list.append(s)
        word_index = html.find(keyword, index_end)
        
    return output_list


### Function to find all occurences of a given 'keyword' in the 'html' string
### and return in 'output_list' the numbers found after this word and before the 'end_character'

def find_all_number(html, keyword, end_character):

    output_list = []
    len_word = len(keyword)
    word_index = html.find(keyword)
    
    while word_index > -1:
        index_end = html.find(end_character, word_index+len_word)
        s = html[word_index+len_word:index_end]
        if s == '':
            s = '0'
        output_list.append(int(s))
        word_index = html.find(keyword, index_end)
        
    return output_list


### Function to find the occurences of a given 'keyword' in the 'html' string
### and returns the number found after this word and before the 'end_character'

def find_one_number(html, keyword, end_character):

    len_word = len(keyword)
    word_index = html.find(keyword)
    
    if word_index > -1:
        index_end = html.find(end_character, word_index+len_word)
        return int(html[word_index+len_word:index_end])
        


### Function to replace the values in the javascript file

def replace(filedata, keyword, replacement):
    
    # Embed replacement variable into a string
    if isinstance(replacement, str):
        replacement = '"' + replacement + '"'
    else:
        replacement = str(replacement)    
    
    word_index = filedata.find(keyword)
    index_end = filedata.find(';', word_index)
    filedata = filedata.replace(filedata[word_index:index_end], keyword+replacement, 1)
    
    return filedata





############## Extracting data from Google Scholar #####################

# Getting the html code of the page
html = urlopen(link).read().decode("latin-1") # "utf-8"

# Searching for the number of citations per year
citations_per_year = find_all_number(html, '<span class="gsc_g_al">', '<')
num_years_cited = len(citations_per_year)

# Total number of citations
total_citations = sum(citations_per_year)

# Searching for the i10 index
i10_index = find_one_number(html, 'i10-index</a></td><td class="gsc_rsb_std">', '<')

# Searching for the h index
h_index = find_one_number(html, 'h-index</a></td><td class="gsc_rsb_std">', '<')

# Searching for the number of citations of each paper
citations_per_paper = find_all_number(html, 'class="gsc_a_ac gs_ibl">', '<')
num_papers = len(citations_per_paper)

# Searching for the link of the citation page for each paper
links_citations = find_all_string(html, '<td class="gsc_a_c"><a href="', '"')
# Removing ASCII strings from the links
for i in range(num_papers):
    links_citations[i] = links_citations[i].replace('amp;', '')
    links_citations[i] = links_citations[i].replace('oe=ASCII&', '')

# Searching for all paper titles
titles = find_all_string(html, 'class="gsc_a_at">', '<')

# Creating the list of years with citations
current_year = datetime.date.today().year
years_cited = list(range(current_year-num_years_cited+1, current_year+1))

# Date of the last update of Google Scholar
last_update = datetime.date.today().strftime('%B %d %Y')

# Displaying extracted data
if display_data:
    print('Last update:', last_update)
    print('Total number of citations:', total_citations)
    print('i10-index:', i10_index)
    print('h-index:', h_index)
    for i in range(num_years_cited):
        print(citations_per_year[i], "citations in", years_cited[i])
    for i in range(num_papers):
        print(titles[i], "has been cited", citations_per_paper[i], "times.")





################ Writing the extracted data into Javascript file ################

# Read in the file
with open(javascript_file, 'r') as file :
  filedata = file.read()
  
  
filedata = replace(filedata, 'var total_citations = ', total_citations)
filedata = replace(filedata, 'var h_index = ', h_index)
filedata = replace(filedata, 'var i10_index = ', i10_index)
filedata = replace(filedata, 'var last_update = ', last_update)
filedata = replace(filedata, 'var years_cited = ', years_cited)
filedata = replace(filedata, 'var citations_per_year = ', citations_per_year)
filedata = replace(filedata, 'var citations_per_paper = ', citations_per_paper)
filedata = replace(filedata, 'var titles = ', titles)
filedata = replace(filedata, 'var links_citations = ', links_citations)

# Write the file out again
with open(javascript_file, 'w') as file:
  file.write(filedata)


