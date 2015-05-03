'use strict';

# this script is used in background.html

chrome.runtime.onInstalled.addListener (details) ->
  console.log('previousVersion', details.previousVersion)

getHostName = (href) ->
    l = document.createElement('a')
    l.href = href
    l

updateBadge = (getCount)->
  chrome.browserAction.setBadgeText({text: "#{getCount}"})

loadToStorage = (url, res) ->
  localStorage["#{url}"] = res

chrome.tabs.onActivated.addListener (activeInfo) ->
  chrome.tabs.get activeInfo.tabId, (tab) ->
    host = getHostName(tab.url)
    if host.protocol == "http:" or host.protocol == "https:"
      if host.hostname
      	getCount = Backend.getCount(host.hostname)
      updateBadge getCount
    

