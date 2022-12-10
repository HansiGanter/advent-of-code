app "target/roc/02-felix"
    packages { pf: "basic-cli/src/main.roc" }
    imports [pf.Task, pf.Stdout, pf.File, pf.Path]
    provides [main] to pf

main =
    Task.onFail task \_ -> crash "rip"

task =
    data <- File.readUtf8 (Path.fromStr "inputs/02-felix") |> Task.await
    rows = Str.split data "\n"
    score1 = Num.toStr (part1 rows)
    score2 = Num.toStr (part2 rows)

    [
        "Part 1: \(score1)",
        "Part 2: \(score2)",
    ]
    |> Str.joinWith "\n"
    |> Stdout.line

part1 = \rows ->
    parseYourChoice = \shape ->
        when shape is
            "X" -> Rock
            "Y" -> Paper
            "Z" -> Scissors
            _ -> crash "Invalid shape '\(shape)'!"

    rows
    |> List.map \row ->
        shapes = when Str.splitFirst row " " is
            Ok x -> x
            _ -> crash "Invalid number of shapes '\(row)'!"
        opponentChoice = parseOpponentChoice shapes.before
        yourChoice = parseYourChoice shapes.after

        score opponentChoice yourChoice
    |> List.sum

part2 = \rows ->
    parseOutcome = \shape ->
        when shape is
            "X" -> Lose
            "Y" -> Draw
            "Z" -> Win
            _ -> crash "Invalid shape '\(shape)'!"
    computeYourChoice = \opponentChoice, outcome ->
        when outcome is
            Lose ->
                when opponentChoice is
                    Rock -> Scissors
                    Paper -> Rock
                    Scissors -> Paper

            Draw ->
                when opponentChoice is
                    Rock -> Rock
                    Paper -> Paper
                    Scissors -> Scissors

            Win ->
                when opponentChoice is
                    Rock -> Paper
                    Paper -> Scissors
                    Scissors -> Rock

    rows
    |> List.map \row ->
        shapes = when Str.splitFirst row " " is
            Ok x -> x
            _ -> crash "Invalid number of shapes '\(row)'!"
        outcome = parseOutcome shapes.after
        opponentChoice = parseOpponentChoice shapes.before
        yourChoice = computeYourChoice opponentChoice outcome

        score opponentChoice yourChoice
    |> List.sum

parseOpponentChoice = \shape ->
    when shape is
        "A" -> Rock
        "B" -> Paper
        "C" -> Scissors
        _ -> crash "Invalid shape '\(shape)'!"

score = \oppenentChoice, yourChoice ->
    when [oppenentChoice, yourChoice] is
        [Rock, Rock] -> 4
        [Rock, Paper] -> 8
        [Rock, Scissors] -> 3
        [Paper, Rock] -> 1
        [Paper, Paper] -> 5
        [Paper, Scissors] -> 9
        [Scissors, Rock] -> 7
        [Scissors, Paper] -> 2
        [Scissors, Scissors] -> 6
        _ -> crash "pattern matching on tuples seems to be not implemented yet :D"
