app "01"
    packages { pf: "basic-cli/src/main.roc" }
    imports [pf.Stdout]
    provides [main] to pf

main =
    Stdout.line "Hello, World!"