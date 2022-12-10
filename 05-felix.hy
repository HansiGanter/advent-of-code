(require hyrule [-> ->>])
(import pathlib [Path])

(setv [stacks_text instructions_text]
    (-> (Path "inputs/05-felix") (.read_text) (.split "\n\n")))

(setv instructions
    (lfor instruction
        (instructions_text.split "\n")
        (lfor operand
            (get (instruction.split " ") (slice 1 None 2))
            (int operand))))

(defn build_stacks []
    (lfor stack
        (zip #*
            (lfor row
                (get (stacks_text.split "\n") (slice 0 -1))
                (get row (slice 1 None 4))))
        (->>
            stack
            reversed
            (filter (fn [crate] (!= " " crate)))
            list)))

(defn execute [stacks ordering]
    (for [[amount from to] instructions]
        (let
            [[source target]
            [(get stacks (- from 1)) (get stacks (- to 1))]]
        (target.extend (ordering (lfor _ (range amount) (source.pop))))))
    (->>
        (lfor stack stacks (get stack -1))
        (str.join "")))

(print "Part 1:" (execute (build_stacks) (fn [x] x)))
(print "Part 2:" (execute (build_stacks) reversed))
