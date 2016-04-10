requirejs.config({
    baseUrl: "js/lib",
    paths: {
        app: "../app",
        async: "require/async",
        propertyParser: "require/propertyParser",
        font: "require/font",
        domReady: "require/domReady",
        jquery: ["jquery.min"],
        framework7: "framework7.min",
        dpanels: "3d.panels.min",
        isotope: "isotope.min",
        imagesLoaded: "imagesLoaded.min",
        countdown: "countdown.min"
    }
}), requirejs(["app/main"]);