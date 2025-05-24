{
  description = "A Nix-flake-based development environment for Python and Node.js";

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1"; 
    nixpkgs-unstable.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, nixpkgs-unstable, ... } @ inputs:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forEachSupportedSystem = f: nixpkgs.lib.genAttrs supportedSystems (system: f {
        pkgs = import nixpkgs { inherit system; };
        pkgs-unstable = import nixpkgs-unstable { inherit system; };
      });

      # Python environment configuration
      pythonVersion = "3.13";
    in
    {
      devShells = forEachSupportedSystem ({ pkgs, pkgs-unstable }:
        let
          # Python specific setup
          concatMajorMinor = v:
            pkgs.lib.pipe v [
              pkgs.lib.versions.splitVersion
              (pkgs.lib.sublist 0 2)
              pkgs.lib.concatStrings
            ];

          python = pkgs."python${concatMajorMinor pythonVersion}";

        in
        {
          # Default shell combining both Python and Node.js tools
          default = pkgs.mkShell {
            venvDir = ".venv"; # For Python venv

            postShellHook = ''
              # Python venv version warning
              venvVersionWarn() {
                  if [ -d "$venvDir/bin/python" ]; then
                      local venvVersion
                      venvVersion="$("$venvDir/bin/python" -c 'import platform; print(platform.python_version())')"

                      [[ "$venvVersion" == "${python.version}" ]] && return

                      cat <<EOF
Warning: Python version mismatch: [$venvVersion (venv)] != [${python.version}]
         Delete '$venvDir' and reload to rebuild for version ${python.version}
EOF
                  # If venv doesn't exist yet, venvShellHook will create it.
                  # No warning needed in that case.
                  fi
              }

              venvVersionWarn
            '';

            packages = (with python.pkgs; [
              venvShellHook
              pip
              # Add other Python packages here, e.g.:
              # pkgs.basedpyright # Using pkgs directly for non-python specific tools is fine
              # python.pkgs.black
              # python.pkgs.ruff
            ]) ++ (with pkgs; [
              # Node.js packages
              node2nix
              nodejs # Or a specific version like nodejs-18_x
              nodePackages.pnpm
              pkgs-unstable.better-commits # From unstable
              # Add other general packages here
            ]);
          };

          # You can also define separate shells if preferred:
          python-shell = pkgs.mkShell {
            venvDir = ".venv";
            postShellHook = ''
              venvVersionWarn() {
                  if [ -d "$venvDir/bin/python" ]; then
                      local venvVersion
                      venvVersion="$("$venvDir/bin/python" -c 'import platform; print(platform.python_version())')"
                      [[ "$venvVersion" == "${python.version}" ]] && return
                      cat <<EOF
Warning: Python version mismatch: [$venvVersion (venv)] != [${python.version}]
         Delete '$venvDir' and reload to rebuild for version ${python.version}
EOF
                  fi
              }
              venvVersionWarn
            '';
            packages = with python.pkgs; [
              venvShellHook
              pip
              # pkgs.basedpyright
              # python.pkgs.black
            ];
          };

          node-shell = pkgs.mkShell {
            packages = with pkgs; [
              node2nix
              nodejs
              nodePackages.pnpm
              pkgs-unstable.better-commits
            ];
          };
        });
    };
}
