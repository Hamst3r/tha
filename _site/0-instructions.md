# How to edit and maintain hamsteralliance.com

## Editing the title and subtitle for the website

Open /\_config.yml inside the root directory. Change the title and subtitle
variable.

## Changing the links for the website

Open /\_data/links.yml and modify the variables as necessary.

## Editing the text boxes

### Finding the appropriate files

Navigate to /\_boxes/ and find the appropriately named Markdown file. Each
file is named in the format "##-short\_memorable\_name.md", where the "##"
represents the order on the website.

### Understanding front matter

Each markdown file within /\_boxes begins with a section denoted by three
opening and closing dashes. Within the front matter are variables and their
values. Comments are provided to help indicate what should not be changed.

### Changing the titles

Within the front-matter of a markdown file, change the "title" variable.

### Changing the content

#### For normal text boxes
After the front matter is the content that appears within the text boxes. It
accepts valid markdown.

#### For the "THA Tools" text box
Due to the complexity of the formatting, all of the tools are listed in YAML
within /\_data/tools.yml and automatically translated into HTML by Jekyll.

#### For THA Shoutbox
The HTML for THA Shoutbox is located within /\_includes/shoutbox.html.

### Changing the order of the text boxes

Simply change the number at the front of the file name to reflect the position
of each text box. Text boxes are ordered in ascending order.

## Changing the radio content

Open /\_data/radio.yml and follow the format. (Note that indentation is
important in order for the YAML to be valid and for the radio to correctly
output content.)

## Changing the downloads

Open /\_data/downloads.yml and follow the format. You can add and remove
sections as needed.

## Modifying the donate message

Open /\_includes/donate.html and input valid HTML.

## Modifying the footer

Open /\_includes/footer.html and input valid HTML.
