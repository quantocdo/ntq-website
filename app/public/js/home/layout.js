;(function(di) {
	'use strict';

	di.factory('/layout', [
		'@lodash',
		'@jquery',
		'@bluebird',
		'@hammer',
		'/animation',
		'/home/navigator',
		function(_, $, Promise, Hammer, animation, navigator) {
			var Layout = function(options) {
				this.paddingTop = options.paddingTop;
				this.sections = options.sections;
				this.container = options.container;
				this.remain = options.remain;
				this.speed = 400;
				this.minHeight = options.minHeight;
				this.enabled = false;
			};

			var proto = Layout.prototype;

			proto.go = function(index) {
				if (this.index === index) {
					return;
				}

				// check direction
				var moveUp = this.index > index;

				this.index = index;

				navigator.set('selected', this.index);

				if (this.current) {
					var self = this;

					self.transition = true;
					self.previous = self.current;
					self.current = self.sections[self.index];

					Promise.all([
						animation.move(self.previous, {
							y: 0
						}, {
							y: moveUp ? self.height : -self.height
						}, self.speed),
						animation.move(self.current, {
							y: moveUp ? -self.height : self.height
						}, {
							y: 0
						}, self.speed)
					]).then(function() {
						self.previous.classList.remove('actived');
						self.previous = undefined;
						self.current.classList.add('actived');
					}).finally(function() {
						self.transition = false;
					});

				} else {
					this.current = this.sections[this.index];

					this.current.classList.add('actived');
				}
			};

			proto.activeRemain = function() {
				var self = this;
				self.index = self.sections.length;
				self.transition = true;
				self.remainActived = true;
				self.remain.classList.remove('hidden');

				navigator.set('selected', self.index);

				Promise.all([
					animation.move(self.current, {
						y: 0
					}, {
						y: -self.height
					}, self.speed),
					animation.move(self.remain, {
						y: self.height + self.paddingTop
					}, {
						y: self.paddingTop
					}, self.speed, true)
				]).then(function() {
					self.remain.classList.add('actived');
				}).finally(function() {
					self.transition = false;
				});
			};

			proto.deactiveRemain = function(index) {
				var self = this;
				self.transition = true;
				self.remainActived = false;

				animation.move(self.remain, {
					y: self.paddingTop
				}, {
					y: self.height + self.paddingTop
				}, self.speed).then(function() {
					self.remain.classList.add('hidden');
					self.remain.classList.remove('actived');
				});

				self.go(index);
			};

			proto.select = function(index) {
				if (this.transition) {
					return;
				}

				if (typeof index === 'undefined') {
					index = 0;
				}

				if (index >= 0 && index < this.sections.length) {
					if (this.index === this.sections.length) {
						this.deactiveRemain(index);
					} else {
						this.go(index);
					}
				} else if (index >= this.sections.length && !this.remainActived) {
					this.activeRemain();
				}
			};

			proto.live = function() {
				function down(self) {
					if (!self.enabled) {
						return;
					}

					if (!self.remainActived) {
						self.select(self.index + 1);
					}
				}

				function up(self) {
					if (!self.enabled) {
						return;
					}

					if (self.remainActived) {
						if (window.scrollY === 0) {
							self.deactiveRemain(self.sections.length - 1);
						}
					} else {
						self.select(self.index - 1);
					}
				}

				var self = this;
				self.$window = $(window);
				var delay;

				self.$window.resize(function() {
					clearTimeout(delay);

					delay = setTimeout(self.resize.bind(self), 100);
				});

				self.$window.on('keydown', function(event) {
					if (self.transition) {
						return;
					}

					if (event.keyCode === 40 || event.keyCode === 34) {
						down(self);
					} else if (event.keyCode === 38 || event.keyCode === 33) {
						up(self);
					}
				});

				$(document.body).on('mousewheel', function(event) {
					var oEvent = event.originalEvent;

					if (self.transition) {
						return;
					}

					if (oEvent.deltaY < 0) {
						up(self);
					}

					if (oEvent.deltaY > 0) {
						down(self);
					}
				});

				_.forEach(self.sections, function(section, index) {
					section.style.zIndex = self.sections.length - index;
				}, self);

				self.resize();
				self.select();

				self.supportGesture(self, up, down);
			};

			proto.supportGesture = function(self, up, down) {
				delete Hammer.defaults.cssProps.userSelect;

				var hammer = new Hammer(document.body, {
					inputClass: Hammer.SUPPORT_POINTER_EVENTS ?
						Hammer.PointerEventInput :
						Hammer.TouchInput
				});

				hammer.get('pan').set({
					direction: Hammer.DIRECTION_VERTICAL
				});

				hammer.on('pan', function(event) {
					if (self.transition) {
						return;
					}

					if (event.offsetDirection === 16) {
						// swipe up
						down(self);
					} else if (event.offsetDirection === 8) {
						// swipe down
						up(self);
					}
				});
			};

			proto.resize = function() {
				var vpHeight = this.$window.height();

				if (vpHeight < this.minHeight) {
					this.enabled = false;
					$(document.body).addClass('page-full-disabled');
					this.sections.height(this.minHeight);
				} else {
					this.enabled = true;
					$(document.body).removeClass('page-full-disabled');
					this.sections.height('100%');
				}

				navigator.set('enabled', this.enabled);

				if (!this.enabled) {
					return;
				}

				this.height = vpHeight - this.paddingTop;

				this.container.height(this.height);
			};

			proto.dispose = function() {

			};

			return Layout;
		}
	]);
})(__('ntq'));
