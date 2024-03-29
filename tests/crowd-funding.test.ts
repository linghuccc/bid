import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BidLog } from "../generated/schema"
import { BidLog as BidLogEvent } from "../generated/CrowdFunding/CrowdFunding"
import { handleBidLog } from "../src/crowd-funding"
import { createBidLogEvent } from "./crowd-funding-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let campaignID = BigInt.fromI32(234)
    let bidder = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let bidAmount = BigInt.fromI32(234)
    let newBidLogEvent = createBidLogEvent(campaignID, bidder, bidAmount)
    handleBidLog(newBidLogEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BidLog created and stored", () => {
    assert.entityCount("BidLog", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BidLog",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "campaignID",
      "234"
    )
    assert.fieldEquals(
      "BidLog",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bidder",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BidLog",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bidAmount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
