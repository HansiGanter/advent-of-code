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

(defn get_stacks [text]
    (->>
        (get (text.split "\n") (slice 0 -1))
        (map (fn [row] (get row (slice 1 None 4))))
        ((fn [rows] (zip #* rows)))
        (map (fn [column]
            (->>
                (filter (fn [crate] (!= " " crate)) column)
                list
                reversed
                list)))
        list))

(defn execute [ordering]
    (let [stacks (get_stacks stacks_text)]
    (for [[amount from to] instructions]
        (let [[source target]
            #((get stacks (- from 1)) (get stacks (- to 1)))]
            (target.extend (ordering (lfor _ (range amount) (source.pop))))))
        (->>
            (lfor stack stacks (get stack -1))
            (str.join ""))))

(print "Part 1:" (execute (fn [x] x)))
(print "Part 2:" (execute reversed))
