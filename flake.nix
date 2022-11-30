{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        roc = pkgs.stdenv.mkDerivation {
          name = "roc";
          sourceRoot = ".";
          src = pkgs.fetchurl {
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
        devShells.default = pkgs.mkShell {
          nativeBuildInputs = [ pkgs.bashInteractive ];
          buildInputs = [
            roc
          ];
        };
      });
}
