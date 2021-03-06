"use strict";
require(["jquery"], function (a) {

    require(["framework7"], function (e) {
        var t = new window.Framework7({
            init: !1,
            cache: !0,
            material: !0,
            pushState: !0,
            swipeout: !1,
            pushStateSeparator: "#/",
            hideNavbarOnPageScroll: !0,
            showBarsOnPageScrollEnd: !0,
            showBarsOnPageScrollTop: !0,
            onAjaxStart: function () {
                var a = i(".ms-loading-screen");
                a.toggleClass("on")
            },
            onAjaxComplete: function () {
                var a = i(".ms-loading-screen");
                a.toggleClass("on")
            }
        }), i = Dom7;
        t.addView(".view-main", {});
        t.onPageInit("*", function (e) {
            var n = i(".navbar.transparent");
            n.length && i(".page-content").scroll(function () {
                var a = i(this).scrollTop() <= 60;
                1 == a ? n.addClass("transparent") : n.removeClass("transparent")
            });
            var s = i(".header-search-icon"), r = i(".ms-header-search");
            r.length > 0 && s.length > 0 && s.on("click", function () {
                r.toggleClass("show"), i(this).toggleClass("show")
            });
            var o = i("[data-gallery-id]");
            o.each(function () {
                var a = [];
                i(this).find("[data-big-src]").each(function () {
                    a.push({url: i(this).data("big-src"), caption: i(this).data("caption")})
                });
                var e = t.photoBrowser({photos: a, theme: "dark", type: "standalone"});
                i(this).find("[data-big-src]").on("click", function () {
                    e.open()
                })
            });
            var l = a(".ms-isotope");
            l.get(0) && require(["isotope", "imagesLoaded"], function (e, t) {
                l.imagesLoaded(function () {
                    l.each(function () {
                        var t = a(this), i = t.prev().find("a"), n = new e(t.get(0), {itemSelector: ".ms-isotope-item"});
                        i.on("click", function (e) {
                            e.preventDefault();
                            var t = a(this), s = t.data("filter");
                            t.hasClass("active") || (i.filter(function () {
                                return a(this).hasClass("active")
                            }).removeClass("active"), t.addClass("active"), n.arrange({filter: s}))
                        })
                    })
                })
            });
            var d = a(".ms-countdown");
            d.get(0) && require(["countdown"], function (e) {
                function t(a, e) {
                    var t = a.strftime("<div><h4>%D</h4><span>" + e.data("days-label") + "</span></div>"), i = a.strftime("<div><h4>%H</h4><span>" + e.data("hours-label") + "</span></div>"), n = a.strftime("<div><h4>%M</h4><span>" + e.data("minutes-label") + "</span></div>"), s = a.strftime("<div><h4>%S</h4><span>" + e.data("seconds-label") + "</span></div>");
                    return t + i + n + s
                }

                d.each(function () {
                    var e = a(this), i = e.data("end-date");
                    e.countdown(i, function (i) {
                        a(this).html(t(i, e))
                    })
                })
            });
            var c = a(".ms-map");
            c.get(0) && require(["async!http://maps.google.com/maps/api/js"], function () {
                function e(a) {
                    var e = {lat: a.data("lat"), lng: a.data("lng")}, t = new google.maps.Map(a.get(0), {
                        center: e,
                        zoom: 15,
                        scrollwheel: !1,
                        draggable: !1
                    });
                    new google.maps.Marker({map: t, position: e, draggable: !1, title: "We're Here!"})
                }

                c.each(function () {
                    var t = a(this);
                    e(t)
                })
            });
            var f = a(".ms-contact-form");
            f.each(function () {
                var e = a(this), i = e.find("[type=submit]");
                e.bind("submit", function () {
                    return i.attr("disabled", "disabled"), a.ajax({
                        type: "POST",
                        url: "mail.php",
                        data: e.serialize(),
                        success: function (a) {
                            0 == a ? t.addNotification({message: "Message Sent!"}) : t.addNotification({message: "Our mail servers are currently down, please try again later!"}), i.removeAttr("disabled")
                        }
                    }), !1
                })
            });
            var h = a(".embed-responsive.will-load");
            h.get(0) && h.each(function () {
                var e = a(this), t = e.children("img"), i = t.data("iframe-src");
                e.append('<iframe src="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), t.remove(), e.removeClass("will-load")
            });
            var u = a(".ms-testimonials");
            u.get(0) && u.each(function () {
                var e = a(this), t = e.find("nav"), i = e.find(".details"), n = e.find(".pipe span");
                t.find("a").on("click", function (e) {
                    if (e.preventDefault(), !a(this).hasClass("active")) {
                        t.find(".active").removeClass("active"), i.find(".active").removeClass("active").slideUp(400), n.css("left", 16.66666666666667 * a(this).index() + "%"), a(this).addClass("active");
                        var s = i.find("div:nth-child(" + (a(this).index() + 1) + ")");
                        s.addClass("active").slideDown(400)
                    }
                }), t.find("a:first-child").click()
            });
            t.calendar({input: "#ks-calendar-default"}), t.calendar({
                input: "#ks-calendar-date-format",
                dateFormat: "DD, MM dd, yyyy"
            }), t.calendar({input: "#ks-calendar-multiple", dateFormat: "M dd yyyy", multiple: !0})
        }), t.init()
    })
});
