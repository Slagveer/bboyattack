Package.describe({
    summary: "Createjs - CreateJS is a suite of modular libraries and tools which work together to enable rich interactive content on open web technologies via HTML5."
});

Package.on_use(function (api) {
    api.use('jquery', 'client');
    api.add_files([
        'lib/easeljs-0.6.0.min.js',
        'lib/tweenjs-0.3.0.min.js',
        'lib/movieclip-0.6.0.min.js',
        'lib/ColorFilter.js',
        'lib/BoxBlurFilter.js'
    ], 'client'
    );
});
