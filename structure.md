date : post.date 
title : post.title.rendered
post link: post.link
image : post.featured_media

category : post._embedded["wp:term"][0][0].name (top of page)
tag : post._embedded["wp:term"][1][0].name (bottom of page)
topic : post._embedded["wp:term"][2]
group : post._embedded["wp:term"][3]