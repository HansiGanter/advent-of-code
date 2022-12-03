app "target/roc/02-felix"
    packages { pf: "basic-cli/src/main.roc" }
    # packages { pf: "https://github.com/roc-lang/basic-cli/releases/download/0.1.1/zAoiC9xtQPHywYk350_b7ust04BmWLW00sjb9ZPtSQk.tar.br" }
    imports [pf.Task, pf.Stdout, pf.File, pf.Path]
    provides [main] to pf

main =
    result <- Task.attempt task
    message = when result is
        Ok _ -> "Seems like everything worked out :-)"
        Err _ -> "Oh, something went wrong :-("
    Stdout.line message

task =
    path = Path.fromStr "inputs/02-felix"
    data <- File.readUtf8 path |> Task.await
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
    yours = \shape ->
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
        oppenentChoice = opponent shapes.before
        yourChoice = yours shapes.after
        score oppenentChoice yourChoice
    |> List.sum

part2 = \rows ->
    parseOutcome = \shape ->
        when shape is
            "X" -> Lose
            "Y" -> Draw
            "Z" -> Win
            _ -> crash "Invalid shape '\(shape)'!"
    computeYourChoice = \opponentChoice, outcome ->
        when opponentChoice is
            Rock -> when outcome is 
                Lose -> Scissors
                Draw -> Rock
                Win -> Paper
            Paper -> when outcome is 
                Lose -> Rock
                Draw -> Paper
                Win -> Scissors
            Scissors -> when outcome is 
                Lose -> Paper
                Draw -> Scissors
                Win -> Rock
    rows
    |> List.map \row ->
        shapes = when Str.splitFirst row " " is
            Ok x -> x
            _ -> crash "Invalid number of shapes '\(row)'!"
        outcome = parseOutcome shapes.after
        oppenentChoice = opponent shapes.before
        yourChoice = computeYourChoice oppenentChoice outcome
        score oppenentChoice yourChoice
    |> List.sum

opponent = \shape ->
    when shape is
        "A" -> Rock
        "B" -> Paper
        "C" -> Scissors
        _ -> crash "Invalid shape '\(shape)'!"

score = \oppenentChoice, yourChoice ->
    when [ oppenentChoice, yourChoice ] is
        [ Rock, Rock ] -> 4
        [ Rock, Paper ] -> 8
        [ Rock, Scissors ] -> 3
        [ Paper, Rock ] -> 1
        [ Paper, Paper ] -> 5
        [ Paper, Scissors ] -> 9
        [ Scissors, Rock ] -> 7
        [ Scissors, Paper ] -> 2
        [ Scissors, Scissors ] -> 6
        _ -> crash "pattern matching on tuples seems to be not implemented yet :D"
