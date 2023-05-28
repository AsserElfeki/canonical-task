date : post.date 
title : post.title.rendered
post link: post.link
image : post.featured_media

author name: post._embedded["author"][0].name
author link: post._embedded["author"][0].link

category : post._embedded["wp:term"][0][0].name (bottom of page)
tag : post._embedded["wp:term"][1][0].name (top of page)
topic : post._embedded["wp:term"][2]
group : post._embedded["wp:term"][3]