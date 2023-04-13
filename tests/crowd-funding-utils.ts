import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { BidLog, CampaignLog } from "../generated/CrowdFunding/CrowdFunding"

export function createBidLogEvent(
  campaignID: BigInt,
  bidder: Address,
  bidAmount: BigInt
): BidLog {
  let bidLogEvent = changetype<BidLog>(newMockEvent())

  bidLogEvent.parameters = new Array()

  bidLogEvent.parameters.push(
    new ethereum.EventParam(
      "campaignID",
      ethereum.Value.fromUnsignedBigInt(campaignID)
    )
  )
  bidLogEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  bidLogEvent.parameters.push(
    new ethereum.EventParam(
      "bidAmount",
      ethereum.Value.fromUnsignedBigInt(bidAmount)
    )
  )

  return bidLogEvent
}

export function createCampaignLogEvent(
  campaignID: BigInt,
  receiver: Address,
  goal: BigInt
): CampaignLog {
  let campaignLogEvent = changetype<CampaignLog>(newMockEvent())

  campaignLogEvent.parameters = new Array()

  campaignLogEvent.parameters.push(
    new ethereum.EventParam(
      "campaignID",
      ethereum.Value.fromUnsignedBigInt(campaignID)
    )
  )
  campaignLogEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  campaignLogEvent.parameters.push(
    new ethereum.EventParam("goal", ethereum.Value.fromUnsignedBigInt(goal))
  )

  return campaignLogEvent
}
