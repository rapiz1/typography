# Typography
![last-commit](https://img.shields.io/github/last-commit/rapiz1/typography.svg)
![size](https://img.shields.io/github/repo-size/rapiz1/typography.svg)
![https://hexo.io](https://img.shields.io/badge/Hexo->%3D3.5-blue.svg)
![License-badge](https://img.shields.io/github/license/Rapiz1/typography.svg)

> A tidy hexo theme focused on clean format and elegant reading experience.

[Demo](http://rapiz.me)

## Features
* Fanfou Support
* Random Quotes
* Mainly Serif Fonts Used
* With Transiting Animation
* All Article Listed on the Homepage

## Getting Started
1. Clone this project.
2. Move `typography` into your `themes` folder where your blog has been established.
3. Edit your `_config.yml`
*Your _config.yml should look like this:*
```
theme: typography
fanfou_username: your_user_name_here
nav:
	Home: /
	Links: /links
```
### Fanfou Support
Replace `your_user_name_here` with your Fanfou username in the configuration above and this should work fine.
### Navigation Bar
Each line following `nav:` will create a tab of the navigation bar. Use relative path to set up.
### Random Quotes
Change the content of `typography/source/js/utils.js`.
## TO-DO
- [ ] Custom quotes using `_data` folder.
- [ ] Add random pictures on the homepage.
