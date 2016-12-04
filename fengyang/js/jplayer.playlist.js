/*
 * Playlist Object for the jPlayer Plugin
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2013 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 2.3.0
 * Date: 20th April 2013
 *
 * Requires:
 *  - jQuery 1.7.0+
 *  - jPlayer 2.3.0+
 */
(function ($, undefined) {
    jPlayerPlaylist = function (cssSelector, playlist, options) {
        var self = this;
        this.current = 0;
        this.time = "";
        this.lrc = "";
        this.loadJson = false;
        this.removing = this.shuffled = this.loop = false;
        this.cssSelector = $.extend({}, this._cssSelector, cssSelector);
        this.options =  $.extend(true, {
            keyBindings: {
                next: {
                    key: 39,
                    fn: function () {
                    	self.next();
                    }
                },
                previous: {
                    key: 37,
                    fn: function () {
                        self.previous();
                    }
                }
            }
        }, this._options, options);
        this.playlist = [];
        this.original = [];
        this.loadPlayList = [];
        
        this._initPlaylist(playlist);
        if( playlist.length==0 ){
        	this._loadPlayList();
        }
        this.cssSelector.title = this.cssSelector.cssSelectorAncestor + " .jp-title";
        
        this.cssSelector.playlist = this.cssSelector.cssSelectorAncestor + " .jp-playlist";
        this.cssSelector.next = this.cssSelector.cssSelectorAncestor + " .jp-next";
        this.cssSelector.previous = this.cssSelector.cssSelectorAncestor + " .jp-previous";
        this.cssSelector.shuffle = this.cssSelector.cssSelectorAncestor + " .jp-shuffle";
        this.cssSelector.shuffleOff = this.cssSelector.cssSelectorAncestor + " .jp-shuffle-off";
        this.options.cssSelectorAncestor = this.cssSelector.cssSelectorAncestor;
        this.options.repeat = function (event) {
            self.loop = event.jPlayer.options.loop;
        };
        $(this.cssSelector.jPlayer).bind( $.jPlayer.event.ready, function () {
            self._init();
        });
        $(this.cssSelector.jPlayer).bind( $.jPlayer.event.timeupdate, function (event) {
        	self._timeupdate(event);
        });
        $(this.cssSelector.jPlayer).bind( $.jPlayer.event.ended, function () {
            self.next();
        });
        $(this.cssSelector.jPlayer).bind( $.jPlayer.event.play, function () {
        	 $(this).jPlayer("pauseOthers");
             self._startLrc();
        });
        $(this.cssSelector.jPlayer).bind( $.jPlayer.event.resize, function (event) {
        	if(event.jPlayer.options.fullScreen) {
				$(self.cssSelector.details).show();
			} else {
				$(self.cssSelector.details).hide();
			}
        });
        $(this.cssSelector.previous).click(function (e) {
        	e.preventDefault();
            self.previous();
            self.blur(this);
        });
        $(this.cssSelector.next).click(function (e) {
        	e.preventDefault();
            self.next();
            self.blur(this);
        });
        $(this.cssSelector.shuffle).click(function (e) {
        	e.preventDefault();
        	if(self.shuffled && $(self.cssSelector.jPlayer).jPlayer("option", "useStateClassSkin")) {
				self.shuffle(false);
			} else {
				self.shuffle(true);
			}
			self.blur(this);
        });
        $(this.cssSelector.shuffleOff).click(function (e) {
        	e.preventDefault();
            self.shuffle(false);
            self.blur(this);
        }).hide();
        this.options.fullScreen || $(this.cssSelector.title).hide();
        $(this.cssSelector.playlist + " ul").empty();
        this._createItemHandlers();
        $(this.cssSelector.jPlayer).jPlayer(this.options);
    };
    jPlayerPlaylist.prototype = {
        _cssSelector: {
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        },
        _options: {
            playlistOptions: {
                autoPlay: !1,
                loopOnPrevious: !1,
                shuffleOnLoop: !0,
                enableRemoveControls: !1,
                displayTime: "slow",
                addTime: "fast",
                removeTime: "fast",
                shuffleTime: "slow",
                itemClass: "jp-playlist-item",
                freeGroupClass: "jp-free-media",
                freeItemClass: "jp-playlist-item-free",
                removeItemClass: "jp-playlist-item-remove",
                lrcContentID : "jp-lrc-content",
                //url : "http://www.ccsxtv.com/h5/audioplayer/json/playlist.json"
                url : "json/playlist.json"
            }
        },
        option: function (option, value) {
            if (value === undefined) return this.options.playlistOptions[option];
            this.options.playlistOptions[option] = value;
            switch (option) {
            case "enableRemoveControls":
                this._updateControls();
                break;
            case "itemClass":
            case "freeGroupClass":
            case "freeItemClass":
            case "removeItemClass":
                this._refresh(true);
                this._createItemHandlers();
            }
            return this;
        },
        _init: function () {
            var self =this;
            this._refresh(function () {
            	self.options.playlistOptions.autoPlay ? self.play(self.current) : self.select(self.current);
            });
            
            /*if( b("#"+ that.options.playlistOptions.lrcContentID).length>0 ){ 
            	that.lrc = b("#"+ that.options.playlistOptions.lrcContentID).val() ;
            	b.lrc.init( that.lrc );
            }*/
            
        },
        
        _playlistIsLoad : function(){
        	var plLoaded = false;
        	var self = this;
       	 	$.each(self.loadPlayList, function (i) {
            	var cssSelectorAncestor = self.loadPlayList[i];
            	if(self.cssSelector.cssSelectorAncestor == cssSelectorAncestor){
            		plLoaded = true;
            	}
            });
       	 	return plLoaded;
        },
        
        _loadPlayList : function(){
        	var self = this;
        	var plLoaded = false;
        	 
        	 if( !self._playlistIsLoad() ){ 
 	            $.when(
 	    				$.ajax({
 	    					type: "GET",
 	    					url: self.options.playlistOptions.url,
 	    					dataType: "json"
 	    				})
 	    			).then(function(result) {
 	    				var playlist = [];
 	    				$.each(result.playlist, function(i, data){
 	    						var  title = data.title,
 	    							 itunes = data.itunes,
 	    							 amazon = data.amazon,
 	    							 download = data.download,
 	    							 mp3 = data.mp3,
 	    							 lrc = data.lrc,
 	    							 playlistJsonString = JSON.stringify({ title: title, itunes : itunes, amazon:amazon, download: download, mp3 : mp3, lrc : lrc }),
 	    							 playlistObject = $.parseJSON(playlistJsonString); // Convert the JSON formatted strings into JSON objects and add to playlist
 	
 	    						playlist.push(playlistObject);
 	    					});
 	
 	    				self.setPlaylist(playlist);
 	    				self.selectLrc(self.current);
 	    				self.loadPlayList.push( self.cssSelector.cssSelectorAncestor );
 	    			});
             }
        },
        
        _timeupdate : function (event) {
        	if(event.jPlayer.status.currentTime==0){  
                this.time = "";  
             }else {  
                this.time = event.jPlayer.status.currentTime;  
             }  
        },
        _startLrc : function (){
        	var self = this;
        	 if(self._playlistIsLoad() && this.lrc!==""){  
                 $.lrc.start(function(){  
                     return self.time;  
                 });  
             }else{  
              $(".jp-lrc").html("没有字幕");  
             }  
        },
        _initPlaylist: function (playlist) {
            this.current = 0;
            this.removing = this.shuffled = false;
            this.original = $.extend(true, [], playlist);
            this._originalPlaylist();
        },
        _originalPlaylist: function () {
            var self = this;
            this.playlist = [];
            $.each(this.original, function (i) {
            	self.playlist[i] = self.original[i];
            });
        },
        _refresh: function (instant) {
            var self = this;
            if (instant && !$.isFunction(instant)) {
            	$(this.cssSelector.playlist + " ul").empty();
            	$.each(this.playlist, function (i) {
                $(self.cssSelector.playlist + " ul").append(self._createListItem(self.playlist[i]));
            	});
            	this._updateControls();
            }else {
                var displayTime = $(this.cssSelector.playlist + " ul").children().length ? this.options.playlistOptions.displayTime : 0;
                $(this.cssSelector.playlist + " ul").slideUp(displayTime, function () {
                	var $this = $(this);
					$(this).empty();
					
                    $.each(self.playlist, function (i) {
                    	$this.append(self._createListItem(self.playlist[i]));
                    });
                    self._updateControls();
                    if($.isFunction(instant)) {
						instant();
					}
                    if(self.playlist.length) {
						$(this).slideDown(0/*self.options.playlistOptions.displayTime*/);
					} else {
						$(this).show();
					}
                });
            }
        },
        _createListItem: function (media) {
            var c = this,
            listItem= "<li><div>",
            listItem= listItem + ("<a href='javascript:;' class='" + this.options.playlistOptions.removeItemClass + "'>&times;</a>");
            if (media.free) {
                var first = true,
                listItem = listItem + ("<span class='" + this.options.playlistOptions.freeGroupClass + "'>(");
                $.each(media, function (property, value) {
                    $.jPlayer.prototype.format[property] && (first ? first = false : listItem += " | ", listItem += "<a class='" + self.options.playlistOptions.freeItemClass + "' href='" + value + "' tabindex='1'>" + media + "</a>")
                });
                listItem += ")</span>"
            }

            listItem += "<a href='javascript:;' class='" + this.options.playlistOptions.itemClass + "' tabindex='1'>" + media.title + (media.artist ?
                " <span class='jp-artist'>by " + media.artist + "</span>" : "") + "</a>";


            listItem +="<span class='ap-jp-song-url'>";

			if ( ! media.download ) {
				if ( media.itunes ) {
					media +="<a target='_blank'  href='"+media.itunes+"' class='itunes'></a>";
				}

				if ( media.amazon ) {
					listItem +="<a target='_blank'  href='"+media.amazon+"' class='amazon'></a>";
				}

				if ( media.buy ) {
					listItem +="<a target='_blank'  href='"+media.buy+"' class='buy'></a>";
				}
			}

			else{
				listItem +="<a class='free-dl'  target='_blank' href='"+media.download+"'></a>";
			
			}
		
			listItem +="</span>";


            return listItem += "</div></li>"
        },

        _createItemHandlers: function () {
            var self = this;
            $(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.itemClass).on("click", "a." + this.options.playlistOptions.itemClass, function (e) {
            	e.preventDefault();
                var index = $(this).parent().parent().index();
                if(self.current !== index) {
					self.play(index);
				} else {
					$(self.cssSelector.jPlayer).jPlayer("play");
				}
				self.blur(this);
                $(this).blur();
            });
            $(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.freeItemClass).on("click",
                "a." + this.options.playlistOptions.freeItemClass, function (e) {
            		e.preventDefault();
                    $(this).parent().parent().find("." + self.options.playlistOptions.itemClass).click();
                    $(this).blur();
                });
            $(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.removeItemClass).on("click", "a." + this.options.playlistOptions.removeItemClass, function (e) {
            	e.preventDefault();
                var index = b(this).parent().parent().index();
                self.remove(index);
                $(this).blur();
            });
        },
        _updateControls: function () {
        	if(this.options.playlistOptions.enableRemoveControls) {
				$(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).show();
			} else {
				$(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).hide();
			}

			if(this.shuffled) {
				$(this.cssSelector.jPlayer).jPlayer("addStateClass", "shuffled");
			} else {
				$(this.cssSelector.jPlayer).jPlayer("removeStateClass", "shuffled");
			}
			if($(this.cssSelector.shuffle).length && $(this.cssSelector.shuffleOff).length) {
				if(this.shuffled) {
					$(this.cssSelector.shuffleOff).show();
					$(this.cssSelector.shuffle).hide();
				} else {
					$(this.cssSelector.shuffleOff).hide();
					$(this.cssSelector.shuffle).show();
				}
			}
        },
        _highlight: function (index) {
        	if(this.playlist.length && index !== undefined) {
				$(this.cssSelector.playlist + " .jp-playlist-current").removeClass("jp-playlist-current");
				$(this.cssSelector.playlist + " li:nth-child(" + (index + 1) + ")").addClass("jp-playlist-current").find(".jp-playlist-item").addClass("jp-playlist-current");
				// $(this.cssSelector.details + " li").html("<span class='jp-title'>" + this.playlist[index].title + "</span>" + (this.playlist[index].artist ? " <span class='jp-artist'>by " + this.playlist[index].artist + "</span>" : ""));
			}
           
        },
        setPlaylist: function (playlist) {
            this._initPlaylist(playlist);
            this._init();
        },
        selectLrc : function (index){
        	index = (index < 0) ? this.original.length + index : index; // Negative index relates to end of array.
			if(0 <= index && index < this.playlist.length) {
				this.current = index;
			} else {
				this.current = 0;
			}
        	this.lrc = this.playlist[this.current].lrc;
        	$.lrc.init( this.lrc );
        },
        
        add: function (media, playNow) {
        	$(this.cssSelector.playlist + " ul").append(this._createListItem(media)).find("li:last-child").hide().slideDown(this.options.playlistOptions.addTime);
			this._updateControls();
			this.original.push(media);
			this.playlist.push(media); // Both array elements share the same object pointer. Comforms with _initPlaylist(p) system.

			if(playNow) {
				this.play(this.playlist.length - 1);
			} else {
				if(this.original.length === 1) {
					this.select(0);
				}
			}
           
        },
        remove: function (index) {
        	var self = this;

			if(index === undefined) {
				this._initPlaylist([]);
				this._refresh(function() {
					$(self.cssSelector.jPlayer).jPlayer("clearMedia");
				});
				return true;
			} else {

				if(this.removing) {
					return false;
				} else {
					index = (index < 0) ? self.original.length + index : index; // Negative index relates to end of array.
					if(0 <= index && index < this.playlist.length) {
						this.removing = true;

						$(this.cssSelector.playlist + " li:nth-child(" + (index + 1) + ")").slideUp(this.options.playlistOptions.removeTime, function() {
							$(this).remove();

							if(self.shuffled) {
								var item = self.playlist[index];
								$.each(self.original, function(i) {
									if(self.original[i] === item) {
										self.original.splice(i, 1);
										return false; // Exit $.each
									}
								});
								self.playlist.splice(index, 1);
							} else {
								self.original.splice(index, 1);
								self.playlist.splice(index, 1);
							}

							if(self.original.length) {
								if(index === self.current) {
									self.current = (index < self.original.length) ? self.current : self.original.length - 1; // To cope when last element being selected when it was removed
									self.select(self.current);
								} else if(index < self.current) {
									self.current--;
								}
							} else {
								$(self.cssSelector.jPlayer).jPlayer("clearMedia");
								self.current = 0;
								self.shuffled = false;
								self._updateControls();
							}

							self.removing = false;
						});
					}
					return true;
				}
			}
        },
        select: function (index) {
        	index = (index < 0) ? this.original.length + index : index; // Negative index relates to end of array.
			if(0 <= index && index < this.playlist.length) {
				this.current = index;
				this._highlight(index);
				$(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current]);
			} else {
				this.current = 0;
			}
        },
        play: function (index) {
        	index = (index < 0) ? this.original.length + index : index; // Negative index relates to end of array.
			if(0 <= index && index < this.playlist.length) {
				if(this.playlist.length) {
					this.select(index);
					$(this.cssSelector.jPlayer).jPlayer("play");
				}
			} else if(index === undefined) {
				$(this.cssSelector.jPlayer).jPlayer("play");
			}
        },
        pause: function () {
            $(this.cssSelector.jPlayer).jPlayer("pause");
        },
        next: function () {
        	var index = (this.current + 1 < this.playlist.length) ? this.current + 1 : 0;

			if(this.loop) {
				// See if we need to shuffle before looping to start, and only shuffle if more than 1 item.
				if(index === 0 && this.shuffled && this.options.playlistOptions.shuffleOnLoop && this.playlist.length > 1) {
					this.shuffle(true, true); // playNow
				} else {
					this.play(index);
				}
			} else {
				// The index will be zero if it just looped round
				if(index > 0) {
					this.play(index);
				}
			}
        },
        previous: function () {
        	var index = (this.current - 1 >= 0) ? this.current - 1 : this.playlist.length - 1;

			if(this.loop && this.options.playlistOptions.loopOnPrevious || index < this.playlist.length - 1) {
				this.play(index);
			}
        },
        shuffle: function (shuffled, playNow) {
        	var self = this;

			if(shuffled === undefined) {
				shuffled = !this.shuffled;
			}

			if(shuffled || shuffled !== this.shuffled) {

				$(this.cssSelector.playlist + " ul").slideUp(this.options.playlistOptions.shuffleTime, function() {
					self.shuffled = shuffled;
					if(shuffled) {
						self.playlist.sort(function() {
							return 0.5 - Math.random();
						});
					} else {
						self._originalPlaylist();
					}
					self._refresh(true); // Instant

					if(playNow || !$(self.cssSelector.jPlayer).data("jPlayer").status.paused) {
						self.play(0);
					} else {
						self.select(0);
					}

					$(this).slideDown(self.options.playlistOptions.shuffleTime);
				});
			}
        },
		blur: function(that) {
			if($(this.cssSelector.jPlayer).jPlayer("option", "autoBlur")) {
				$(that).blur();
			}
		}
    };
})(jQuery);