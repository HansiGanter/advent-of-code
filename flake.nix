{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    devshell = {
      url = "github:numtide/devshell";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.flake-utils.follows = "flake-utils";
    };
  };

  outputs = inputs:
    inputs.flake-utils.lib.eachDefaultSystem (system:
      let
        nixpkgs = import inputs.nixpkgs {
          system = system;
          overlays = [ inputs.devshell.overlay ];
        };
        roc = nixpkgs.stdenv.mkDerivation {
          name = "roc";
          sourceRoot = ".";
          src = nixpkgs.fetchurl {
            url = "https://github.com/roc-lang/roc/releases/download/nightly/roc_nightly-linux_x86_64-2022-11-30-1e47de3.tar.gz";
            sha256 = "sha256-PCEmeIQaPnTU76YRplvJzQEV+7aCF/l4ObXmdmp2cNk=";
          };
          buildPhase = "true";
          installPhase = ''
            mkdir -p $out/bin
            mv roc $out/bin/roc
          '';
        };
      in
      {
        devShells.default = with nixpkgs; devshell.mkShell {
          motd = "Merry coding 🎁🎄";
          packages = [
            clojure
            deno
            ghc
            (hy.withPackages (ps: with ps; [ hyrule ]))
            luajit
            roc
          ];
        };
      });
}
