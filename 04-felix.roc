app "target/roc/02-felix"
    packages { pf: "basic-cli/src/main.roc" }
    imports [pf.Task, pf.Stdout, pf.File, pf.Path]
    provides [main] to pf

main = Task.onFail task \_ -> crash "rip"

task =
    data <- File.readUtf8 (Path.fromStr "inputs/04-felix") |> Task.await
    pairsOfRanges =
        data
        |> Str.split "\n"
        |> List.map \line ->
            Str.split line ","
            |> List.map \range ->
                Str.split range "-"
                |> List.map \text ->
                    when Str.toI32 text is
                        Ok number -> number
                        Err _ -> crash "\(text) is not a number"
    numberOfFullyOverlappingSections =
        pairsOfRanges
            |> List.countIf \pair ->
                when pair is
                    [[a, b], [c, d]] -> (a <= c && d <= b) || (c <= a && b <= d)
                    _ -> crash "invalid pair"
            |> Num.toStr
    numberOverlappingSections =
        pairsOfRanges
            |> List.countIf \pair ->
                when pair is
                    [[a, b], [c, d]] ->  a <= d && c <= b
                    _ -> crash "invalid pair"
            |> Num.toStr
    Str.joinWith
    [
        "Part 1: \(numberOfFullyOverlappingSections)",
        "Part 2: \(numberOverlappingSections)",
    ]
    "\n"
    |> Stdout.line
