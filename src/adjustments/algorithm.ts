import { P, match } from "ts-pattern";

export type LiftSet = {
  weight: number;
  reps: number;
};

type APRE = {
  min: number;
  mid: number;
  max: number;
};

type APRE_MAP = Record<3 | 6 | 10, APRE>;

const apreMap: APRE_MAP = {
  3: { min: 2, mid: 4, max: 6 },
  6: { min: 2, mid: 7, max: 12 },
  10: { min: 6, mid: 11, max: 16 },
};

export const adjustWeightAPRE =
  (apre: 3 | 6 | 10) =>
  (set: LiftSet): number => {
    const { min, mid, max } = apreMap[apre];
    return match(set)
      .with(
        { reps: P.when((value) => value <= min), weight: P.select() },
        (weight) => weight - 10,
      )
      .with(
        { reps: P.when((value) => value <= mid), weight: P.select() },
        (weight) => weight,
      )
      .with(
        { reps: P.when((value) => value <= max), weight: P.select() },
        (weight) => weight + 10,
      )
      .with(P._, () => set.weight + 15)
      .exhaustive();
  };
