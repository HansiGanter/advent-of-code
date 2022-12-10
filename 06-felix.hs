import Data.Function
import Data.List (findIndex, intercalate)
import qualified Data.Set as Set

main :: IO ()
main =
  readFile "inputs/06-felix"
    >>= \text ->
      [ "Part 1: " ++ show (startOfMessage 4 text),
        "Part 2: " ++ show (startOfMessage 14 text)
      ]
        & intercalate "\n"
        & putStrLn

startOfMessage :: Int -> String -> Maybe Int
startOfMessage n text =
  text
    & windows n
    & findIndex ((== n) . length . Set.fromList)
    & fmap (+ n)

windows :: Int -> [a] -> [[a]]
windows n sequence
  | length atMostFour == n = atMostFour : windows n (tail sequence)
  | otherwise = []
  where
    atMostFour = take n sequence
