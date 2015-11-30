define(function(require,exports,module){"use strict";var Menus=brackets.getModule("command/Menus"),CommandManager=brackets.getModule("command/CommandManager"),Commands=brackets.getModule("command/Commands"),MainViewManager=brackets.getModule("view/MainViewManager"),Strings=brackets.getModule("strings"),PreferencesManager=brackets.getModule("preferences/PreferencesManager"),workingSetListCmenu=Menus.getContextMenu(Menus.ContextMenuIds.WORKING_SET_CONTEXT_MENU);var closeOthers="file.close_others",closeAbove="file.close_above",closeBelow="file.close_below";var prefs=PreferencesManager.getExtensionPrefs("closeOthers"),menuEntriesShown={};prefs.definePreference("below","boolean",true);prefs.definePreference("others","boolean",true);prefs.definePreference("above","boolean",true);function handleClose(mode){var targetIndex=MainViewManager.findInWorkingSet(MainViewManager.ACTIVE_PANE,MainViewManager.getCurrentlyViewedPath(MainViewManager.ACTIVE_PANE)),workingSetList=MainViewManager.getWorkingSet(MainViewManager.ACTIVE_PANE),start=mode===closeBelow?targetIndex+1:0,end=mode===closeAbove?targetIndex:workingSetList.length,files=[],i;for(i=start;i<end;i++){if(mode===closeOthers&&i!==targetIndex||mode!==closeOthers){files.push(workingSetList[i])}}CommandManager.execute(Commands.FILE_CLOSE_LIST,{fileList:files})}function contextMenuOpenHandler(){var file=MainViewManager.getCurrentlyViewedFile(MainViewManager.ACTIVE_PANE);if(file){var targetIndex=MainViewManager.findInWorkingSet(MainViewManager.ACTIVE_PANE,file.fullPath),workingSetListSize=MainViewManager.getWorkingSetSize(MainViewManager.ACTIVE_PANE);if(targetIndex===workingSetListSize-1){CommandManager.get(closeBelow).setEnabled(false)}else{CommandManager.get(closeBelow).setEnabled(true)}if(workingSetListSize===1){CommandManager.get(closeOthers).setEnabled(false)}else{CommandManager.get(closeOthers).setEnabled(true)}if(targetIndex===0){CommandManager.get(closeAbove).setEnabled(false)}else{CommandManager.get(closeAbove).setEnabled(true)}}}function getPreferences(){return{closeBelow:prefs.get("below",PreferencesManager.CURRENT_PROJECT),closeOthers:prefs.get("others",PreferencesManager.CURRENT_PROJECT),closeAbove:prefs.get("above",PreferencesManager.CURRENT_PROJECT)}}function prefChangeHandler(){var prefs=getPreferences();if(prefs.closeBelow!==menuEntriesShown.closeBelow){if(prefs.closeBelow){workingSetListCmenu.addMenuItem(closeBelow,"",Menus.AFTER,Commands.FILE_CLOSE)}else{workingSetListCmenu.removeMenuItem(closeBelow)}}if(prefs.closeOthers!==menuEntriesShown.closeOthers){if(prefs.closeOthers){workingSetListCmenu.addMenuItem(closeOthers,"",Menus.AFTER,Commands.FILE_CLOSE)}else{workingSetListCmenu.removeMenuItem(closeOthers)}}if(prefs.closeAbove!==menuEntriesShown.closeAbove){if(prefs.closeAbove){workingSetListCmenu.addMenuItem(closeAbove,"",Menus.AFTER,Commands.FILE_CLOSE)}else{workingSetListCmenu.removeMenuItem(closeAbove)}}menuEntriesShown=prefs}function initializeCommands(){var prefs=getPreferences();CommandManager.register(Strings.CMD_FILE_CLOSE_BELOW,closeBelow,function(){handleClose(closeBelow)});CommandManager.register(Strings.CMD_FILE_CLOSE_OTHERS,closeOthers,function(){handleClose(closeOthers)});CommandManager.register(Strings.CMD_FILE_CLOSE_ABOVE,closeAbove,function(){handleClose(closeAbove)});if(prefs.closeBelow){workingSetListCmenu.addMenuItem(closeBelow,"",Menus.AFTER,Commands.FILE_CLOSE)}if(prefs.closeOthers){workingSetListCmenu.addMenuItem(closeOthers,"",Menus.AFTER,Commands.FILE_CLOSE)}if(prefs.closeAbove){workingSetListCmenu.addMenuItem(closeAbove,"",Menus.AFTER,Commands.FILE_CLOSE)}menuEntriesShown=prefs}initializeCommands();workingSetListCmenu.on("beforeContextMenuOpen",contextMenuOpenHandler);prefs.on("change",prefChangeHandler)});